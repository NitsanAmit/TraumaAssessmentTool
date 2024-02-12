import { computed, makeAutoObservable } from 'mobx';
import _ from 'lodash';
import { QuestionnairesStore } from './QuestionnairesStore';
import { QuestionBase } from '../components/questionnaires/base/types';
import { QuestionnairesSummary, SECOND_STAGE_RESULT_CATEGORY, SecondStageResultCategory } from './types';
import { exportToPdf } from './pdf-utils';
import { QUESTIONNAIRE_NAME_TO_ELEMENT, QUESTIONNAIRE_NAME_TO_SYMPTOMS, QuestionnaireTypes } from '../data/data.consts';

export class ResultsStore {

  constructor(private questionnairesStore: QuestionnairesStore) {
    makeAutoObservable(this);
  }

  @computed
  get summary(): QuestionnairesSummary {
    return _.reduce(this.questionnairesStore.questions, (acc, question, index) => {
      const { questionnaire, questionnaireType } = question;
      const score = this.questionnairesStore.questionnaireScores[index]?.score;
      const didPassThreshold = this.questionnairesStore.questionnaireScores[index]?.didPassThreshold;
      if (score === undefined || questionnaireType === QuestionnaireTypes.CUT_OFF) {
        return acc;
      }
      if (questionnaireType === QuestionnaireTypes.MULTI_DISCRETE_SCALE) {
        return [...acc, ...(this._getMultiDiscreteScaleQuestionnaireSummary(score, question, didPassThreshold))];
      }
      return [...acc, {
        questionnaireName: questionnaire,
        questionnaireType,
        didPassThreshold,
        score: this._getQuestionnaireSummaryScore(question, score),
        ...this.questionnairesStore.getQuestionnaireRange(question),
      }];
    }, []);
  }

  @computed
  get rangedSummary(): QuestionnairesSummary {
    if (this.questionnairesStore.skippedSecondSection) {
      return this.summary.slice(0, this.questionnairesStore.cutoffQuestionIndex + 1);
    } else {
      return this.summary.slice(this.questionnairesStore.cutoffQuestionIndex, this.summary.length);
    }
  }

  @computed
  get questionnairesOverThreshold(): QuestionnairesSummary {
    return _.filter(this.rangedSummary, ({ didPassThreshold }) => didPassThreshold);
  }

  @computed
  get secondStageResultCategory(): SecondStageResultCategory {
    // Negative if all questionnaires are under the threshold
    // Slightly positive if 1-2 questionnaires are not more than 20% over the threshold
    // Positive else
    if (this.questionnairesOverThreshold.length === 0 || this.questionnairesStore.skippedSecondSection) {
      return SECOND_STAGE_RESULT_CATEGORY.NEGATIVE;
    }
    if (this.questionnairesOverThreshold.length < 3) {
      const isSlightlyPositive = this.questionnairesOverThreshold.every(({
                                                                           score,
                                                                           maxScore,
                                                                           threshold
                                                                         }) => {
        if (typeof score !== 'number') {
          return true;
        }
        const percentage = this._percentOverThreshold(score, maxScore, threshold);
        return percentage <= 20;
      });
      if (isSlightlyPositive) {
        return SECOND_STAGE_RESULT_CATEGORY.SLIGHTLY_POSITIVE;
      }
    }
    return SECOND_STAGE_RESULT_CATEGORY.POSITIVE;
  }

  @computed
  get resultsElements(): string | null {
    const elements = _.chain(this.summary)
      .filter(s => !_.isNil(s.score))
      .map(s => QUESTIONNAIRE_NAME_TO_ELEMENT[s.questionnaireName])
      .filter(Boolean)
      .uniq()
      .value();
    return this._toDelimitedString(elements);
  }

  @computed
  get resultsSymptoms() {
    if (this.secondStageResultCategory === SECOND_STAGE_RESULT_CATEGORY.NEGATIVE) {
      return null;
    }
    return _.chain(this.questionnairesOverThreshold)
      .map(q => QUESTIONNAIRE_NAME_TO_SYMPTOMS[q.questionnaireName])
      .filter(Boolean)
      .uniq()
      .value();
  }

  @computed
  get resultsSymptomsString(): string | null {
    return this._toDelimitedString(this.resultsSymptoms);
  }

  @computed
  get resultsVerbalSummary(): { summary: string; actions: string[]; } {
    const baseActions = [
      'אם רוצים, כדאי לדבר עם אדם שסומכים עליו, קרוב/ה או חבר/ה, ולשתף במה שאת/ה מרגיש/ה וחווה, ולא להישאר לבד עם התחושות הקשות.',
      'אפשר להתקשר לארגוני תמיכה נפשית כמו ער"ן (1-201) או נט"ל (1-800-363-363) אם מרגישים מצוקה גדולה כרגע.',
    ];
    const negativeActions = [
      'אם את/ה בכל זאת מרגיש/ה צורך בכך, כדאי לפנות לייעוץ בהקדם. באפשרותך להדפיס את התוצאות ולהציגן למטפל/ת שתבחרי או לרופא/ת המשפחה, כדי לקבל עזרה או לקבל המלצות לטיפול נוסף.',
      'כדאי לחזור ולבצע שוב את ההערכה בעוד שבועיים, כדי לוודא שהמצב נשאר יציב והתגובות עדיין תקינות.',
      ...baseActions,
    ];
    switch (this.secondStageResultCategory) {
      case SECOND_STAGE_RESULT_CATEGORY.NEGATIVE:
        if (this.questionnairesStore.skippedSecondSection) {
          return {
            summary: 'הסימנים עליהם דיווחת דומים לאלה שרוב האנשים מרגישים. הם אינם מדאיגים ויחלפו עם הזמן וכאשר האירועים יירגעו, ונראה שאינך זקוק/ה לעזרה טיפולית כרגע. ' +
              'יש לך כוח היום לעזור לאחרים, לשמור על שיגרת החיים, לתת למי שצריך או צריכה, וגם לנהל חיים בריאים. ',
            actions: negativeActions,
          }
        }
        return {
          summary: 'דיווחת על רמות מצוקה, שלמרות שהן עשויות להיות כואבות עבורך, הן אופייניות לרוב האנשים במצבים דומים. ' +
            'אנשים המדווחים על רמות סבירות של מצוקה יכולים לעודד אחרים ובמיוחד בני משפחה, לנחם או לשתף תחושות חיוביות, ולחזור לחיים בריאים. ' +
            'אין הכרח לפנות לעזרה מקצועית עכשיו, ורוב הסיכויים הם שתחלימ/י עם חלוף הזמן ועם תמיכה של אחרים. ',
          actions: negativeActions,
        };
      case SECOND_STAGE_RESULT_CATEGORY.SLIGHTLY_POSITIVE:
        return {
          summary: 'בתחומים אחרים הסימפטומים שלך אינם שונים ממה שאנשים מרגישים בדרך כלל במצבים דומים.\n' +
            'אין הכרח לפנות לעזרה מקצועית עכשיו, ורוב הסיכויים הם שתחלימ/י עם חלוף הזמן ועם תמיכה של אחרים. ',
          actions: [
            'אם את/ה בכל זאת מרגיש/ה צורך בכך, או אם את/ה מאוד לבד או במצוקה - כדאי לפנות לייעוץ.',
            'בכל מקרה כדאי לחזור ולבצע שוב את ההערכה בעוד שבועיים.',
            ...baseActions,
          ],
        };
      case SECOND_STAGE_RESULT_CATEGORY.POSITIVE:
        return {
          summary: 'הסימפטומים שלך לא קלים, וחשוב מאד לפנות להערכה מקצועית ולטיפול. ' +
            'חשוב לא להתעכב עם הפנייה, ולגשת בהקדם לגורם מקצועי. ',
          actions: [
            'כדאי לפנות ראשית לגורם הכי זמין – למשל רופא/ת המשפחה או עובד/ת סוציאלי/ת. כדאי לשמור את התוצאות בדף זה ולהשתמש בהן כדי לעזור בפנייתך.',
            ...baseActions,
          ],
        };
      default:
        return { summary: '', actions: [] };
    }
  }

  public async exportToPdf(personalDetailsSummary?: Record<string, string | undefined>) {
    return exportToPdf(this.rangedSummary, this.resultsVerbalSummary.summary, this.resultsSymptomsString, personalDetailsSummary);
  }

  private _getQuestionnaireSummaryScore(questionnaire: QuestionBase, score: number | string): number | string {
    if (questionnaire.questionnaireType === QuestionnaireTypes.TRUE_FALSE) {
      return score === 0 ? 'לא' : 'כן';
    }
    return score;
  }

  private _toDelimitedString(elements: string[] | null) {
    if (!elements || elements?.length === 0) {
      return null;
    }
    if (elements.length === 1) {
      return elements[0];
    }
    return elements.slice(0, elements.length - 1).join(', ') + ' ו' + elements.slice(-1).pop();
  }

  private _getMultiDiscreteScaleQuestionnaireSummary(scores, question, didPassThreshold) {
    return scores.map((qScore, qIndex) => {
      return ({
        questionnaireName: question.questionnaires[qIndex].questionnaire,
        questionnaireType: QuestionnaireTypes.DISCRETE_SCALE,
        score: qScore,
        didPassThreshold,
        ...this.questionnairesStore.getQuestionnaireRange(question.questionnaires[qIndex]),
      });
    });
  }

  private _percentOverThreshold(score: number, max: number, threshold: number): number {
    return Math.round((score - threshold) / (max - threshold) * 100);
  }
}
