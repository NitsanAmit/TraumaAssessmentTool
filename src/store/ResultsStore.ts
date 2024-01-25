import { computed, makeAutoObservable } from 'mobx';
import _ from 'lodash';
import { QuestionnairesStore } from './QuestionnairesStore';
import { QuestionnaireNames, QuestionnaireTypes } from '../components/questionnaires/base/types';
import { QuestionnairesSummary, SECOND_STAGE_RESULT_CATEGORY, SecondStageResultCategory } from './types';
import { exportToPdf } from './pdf-utils';

export class ResultsStore {

  constructor(private questionnairesStore: QuestionnairesStore) {
    makeAutoObservable(this);
  }

  @computed
  get summary(): QuestionnairesSummary {
    return _.reduce(this.questionnairesStore.questions, (acc, question, index) => {
      const { questionnaire, questionnaireType } = question;
      const score = this.questionnairesStore.questionnaireScores[index]?.score;
      if (score === undefined || questionnaireType === QuestionnaireTypes.CUT_OFF) {
        return acc;
      }
      if (questionnaireType === QuestionnaireTypes.MULTI_DISCRETE_SCALE) {
        return [...acc, ...(this._getMultiDiscreteScaleQuestionnaireSummary(score, question))];
      }
      return [...acc, {
        questionnaireName: questionnaire,
        questionnaireType,
        score,
        ...this.questionnairesStore.getQuestionnaireRange(question),
      }];
    }, []);
  }

  @computed
  get rangedSummary(): QuestionnairesSummary {
    if (this.questionnairesStore.skippedSecondSection) {
      return this.summary.slice(0, this.questionnairesStore.cutoffQuestionIndex + 1);
    } else {
      return this.summary.slice(this.questionnairesStore.cutoffQuestionIndex + 1, this.summary.length);
    }
  }


  @computed
  get wantHelp(): boolean {
    const wantHelpQuestion = _.indexOf(this.questionnairesStore.questions, _.find(this.questionnairesStore.questions, { questionnaire: QuestionnaireNames.WANT_HELP }));
    return this.questionnairesStore.questionnaireScores[wantHelpQuestion]?.didPassThreshold;
  }

  @computed
  get questionnairesOverThreshold(): QuestionnairesSummary {
    return _.filter(this.rangedSummary, (summary) => summary.score >= summary.threshold);
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
      const isSlightlyPositive = this.questionnairesOverThreshold.every(({ score, minScore, maxScore, threshold }) => {
        const percentage = this._percentOverThreshold(score, maxScore, threshold);
        return percentage <= 20;
      });
      if (isSlightlyPositive && !this.wantHelp) {
        return SECOND_STAGE_RESULT_CATEGORY.SLIGHTLY_POSITIVE;
      }
    }
    return SECOND_STAGE_RESULT_CATEGORY.POSITIVE;
  }

  @computed
  get resultsElements() {
    return _.chain(this.summary)
      .filter(s => s.score)
      .map(s => QUESTIONNAIRE_NAME_TO_ELEMENT[s.questionnaireName])
      .filter(Boolean)
      .uniq()
      .value();
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
  get resultsVerbalSummary(): string {
    switch (this.secondStageResultCategory) {
      case SECOND_STAGE_RESULT_CATEGORY.NEGATIVE:
        if (this.questionnairesStore.skippedSecondSection) {
          return 'הסימנים עליהם דיווחת דומים לאלה שרוב האנשים מרגישים. הם אינם מדאיגים ויחלפו עם הזמן וכאשר האירועים יירגעו, ונראה שאינך זקוק לעזרה טיפולית כרגע. ' +
            'יש לך כוח היום לעזור לאחרים, לשמור על שיגרת החיים, לתת למי שצריך או צריכה, וגם לנהל לחיים בריאים. ' +
            'כדאי לחזור ולבצע שוב את ההערכה בעוד שבועיים, כדי לוודא שהמצב נשאר יציב והתגובות עדיין תקינות.\n' +
            'באפשרותך להדפיס את התוצאות ולהציגן למטפל/ת שתבחרי או לרופא/ת המשפחה, כדי לקבל עזרה או לקבל המלצות לטיפול נוסף.';
        }
        return 'דיווחת על רמות מצוקה, שלמרות שהן עשויות להיות כואבות עבורך, הן אופייניות לרוב האנשים במצבים דומים. ' +
          'אנשים המדווחים על רמות סבירות של מצוקה יכולים לעודד אחרים, ובמיוחד בני משפחה, ולנחם ולשתף תחושות חיוביות ולחזור לחיים בריאים. ' +
          'כדאי לחזור ולבצע שוב את ההערכה בעוד שבועיים, כדי לוודא שהמצב נשאר יציב והתגובות עדיין תקינות.\n' +
          'באפשרותך להדפיס את התוצאות ולהציגן למטפל/ת שתבחרי או לרופא/ת המשפחה, כדי לקבל עזרה או לקבל המלצות לטיפול נוסף.';
      case SECOND_STAGE_RESULT_CATEGORY.SLIGHTLY_POSITIVE:
        return 'בתחומים אחרים הסימפטומים שלך אינם שונים ממה שאנשים מרגישים בדרך כלל במצבים דומים.\n' +
          'אין הכרח לפנות לעזרה מקצועית עכשיו, ורוב הסיכויים הם שתחלימ/י עם חלוף הזמן ועם תמיכה של אחרים.\n' +
          'אם את/ה בכל זאת מרגיש/ה צורך בכך, או אם את/ה מאוד לבד או איבדת תקווה - כדאי לפנות לייעוץ. ' +
          'בכל מקרה כדאי לחזור ולבצע שוב את ההערכה בעוד שבועיים.\n' +
          'באפשרותך להדפיס את התוצאות ולהציגן למטפל/ת שתבחרי או לרופא/ת המשפחה, כדי לקבל עזרה או לקבל המלצות לטיפול נוסף.';
      case SECOND_STAGE_RESULT_CATEGORY.POSITIVE:
        return 'הסימפטומים שלך לא קלים, וחשוב מאד לפנות להערכה מקצועית ולטיפול. ' +
          'חשוב לא להתעכב עם הפנייה, ולגשת בהקדם לגורם מקצועי. ' +
          'כדאי לפנות ראשית לגורם הכי זמין – למשל רופא/ת המשפחה או עובד/ת סוציאלי/ת.\n' +
          'כדאי לשמור את התוצאות בדף זה ולהשתמש בהן כדי לעזור בפנייתך.';
      default:
        return '';
    }
  }

  public async exportToPdf(personalDetailsSummary?: Record<string, string | undefined>) {
    return exportToPdf(this.summary, personalDetailsSummary);
  }

  private _getMultiDiscreteScaleQuestionnaireSummary(scores, question) {
    return scores.map((qScore, qIndex) => {
      return ({
        questionnaireName: question.questionnaires[qIndex].questionnaire,
        questionnaireType: QuestionnaireTypes.DISCRETE_SCALE,
        score: qScore,
        ...this.questionnairesStore.getQuestionnaireRange(question.questionnaires[qIndex]),
      });
    });
  }

  private _percentOverThreshold(score: number, max: number, threshold: number): number {
    return Math.round((score - threshold) / (max - threshold) * 100);
  }
}

const QUESTIONNAIRE_NAME_TO_ELEMENT: { [key: string]: string } = {
  [QuestionnaireNames.CGI]: 'מצוקה',
  [QuestionnaireNames.GAD_2]: 'חרדה',
  [QuestionnaireNames.PHQ_2]: 'דיכאון',
  [QuestionnaireNames.K5]: 'מצוקה',
  [QuestionnaireNames.PC_PTSD_5]: 'פוסט-טראומה',
  [QuestionnaireNames.CSE_T]: 'התמודדות',
  [QuestionnaireNames.Dissociation]: 'דיסוציאציה',
  [QuestionnaireNames.Derealization]: 'דיסוציאציה',
  [QuestionnaireNames.SAST]: 'מתח',
  [QuestionnaireNames.PCL_5]: 'פוסט-טראומה',
  [QuestionnaireNames.STO]: 'פוסט-טראומה',
  [QuestionnaireNames.GAD_7]: 'חרדה',
  [QuestionnaireNames.PHQ_9]: 'דיכאון',
  [QuestionnaireNames.ICG]: 'תגובות לאבדן ושכול',
  [QuestionnaireNames.WANT_HELP]: 'מצוקה',
}

const QUESTIONNAIRE_NAME_TO_SYMPTOMS: { [key: string]: string } = {
  [QuestionnaireNames.Dissociation]: 'אובדן קשר עם מה שקורה לך או סביבך',
  [QuestionnaireNames.Derealization]: 'אובדן קשר עם מה שקורה לך או סביבך',
  [QuestionnaireNames.SAST]: 'אי-שקט ומצב רוח רע',
  [QuestionnaireNames.PCL_5]: 'סימני פוסט טראומה',
  [QuestionnaireNames.STO]: 'שינוי לרעה בחייך',
  [QuestionnaireNames.GAD_7]: 'חרדה',
  [QuestionnaireNames.PHQ_9]: 'עצב או דיכאון',
  [QuestionnaireNames.ICG]: 'אבל ואובדן מתמשך',
  [QuestionnaireNames.WANT_HELP]: 'יש לך צורך בייעוץ או טיפול',
}
