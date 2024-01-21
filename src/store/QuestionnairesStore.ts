import { action, computed, makeAutoObservable } from 'mobx';
import _ from 'lodash';
import { QuestionBase, QuestionnaireTypes } from '../components/questionnaires/base/types';
import { QuestionnairesSummary } from './types';

export class QuestionnairesStore {

  questionnaireIndex: number = 0;
  questionnaireScores = {};
  questionnairesStates = Array<unknown>(this.questions.length);

  constructor(private proceedToSummary: () => void, private questions: QuestionBase[]) {
    makeAutoObservable(this);
  }

  @computed
  get currentQuestion(): QuestionBase {
    return this.questions[this.questionnaireIndex];
  }

  @computed
  get currentQuestionState(): unknown {
    return this.questionnairesStates[this.questionnaireIndex];
  }

  @computed
  get cutoffQuestionIndex(): number {
    return _.findIndex(this.questions, { questionnaireType: QuestionnaireTypes.CUT_OFF });
  }

  @computed
  get beforeCutoff(): boolean {
    return this.questionnaireIndex < this.cutoffQuestionIndex;
  }

  @computed
  get progress(): number {
    if (this.beforeCutoff) {
      return this.questionnaireIndex + 1;
    } else {
      return this.questionnaireIndex - this.cutoffQuestionIndex;
    }
  }

  @computed
  get maxProgress(): number {
    if (this.beforeCutoff) {
      return this.cutoffQuestionIndex;
    } else {
      return (this.questions.length - this.cutoffQuestionIndex - 1);
    }
  }

  @computed
  get verbalProgress(): string {
    return `שאלון ${this.progress} מתוך ${this.maxProgress}`;
  }

  @computed
  get summary(): QuestionnairesSummary {
    return _.reduce(this.questions, (acc, question, index) => {
        const { questionnaire, questionnaireType } = question;
        const score = this.questionnaireScores[index]?.score;
        if (score === undefined || questionnaireType === QuestionnaireTypes.CUT_OFF) {
          return acc;
        }
        if (questionnaireType === QuestionnaireTypes.MULTI_DISCRETE_SCALE) {
          return [...acc, ...(this._getMultiDiscreteScaleQuestionnaireSummary(score, question))];
        }
      if (questionnaireType === QuestionnaireTypes.TRUE_FALSE) {
        return [...acc, { questionnaireName: questionnaire, questionnaireType, score: score ? 'כן' : 'לא' }];
      }
      return [...acc, { questionnaireName: questionnaire, questionnaireType, score }];
      }, []);
  }

  private _getMultiDiscreteScaleQuestionnaireSummary(scores, question) {
    return scores.map((qScore, qIndex) => ({
      questionnaireName: question.questionnaires[qIndex].questionnaire,
      questionnaireType: QuestionnaireTypes.DISCRETE_SCALE,
      score: qScore,
    }));
  }

  @action
  previousQuestion() {
    this.questionnaireIndex--;
  }

  @action
  nextQuestion(currentState: unknown, didPassScoreBar: boolean, score: number | string) {
    if (this.currentQuestion?.questionnaireType !== QuestionnaireTypes.CUT_OFF) {
      this.questionnairesStates[this.questionnaireIndex] = currentState;
      this.questionnaireScores[this.questionnaireIndex] = { score, didPassScoreBar };
    }
    const finishedAllQuestionnaires = this.questionnaireIndex === this.questions.length - 1;
    const didntPassScoreBar = this.currentQuestion.questionnaireType === QuestionnaireTypes.CUT_OFF && !didPassScoreBar;
    if (didntPassScoreBar || finishedAllQuestionnaires) {
      this.proceedToSummary();
      return;
    }
    this.questionnaireIndex++;
    if (this.currentQuestion?.questionnaireType === QuestionnaireTypes.CUT_OFF) {
      this.questionnairesStates[this.questionnaireIndex] = _.some(this.questionnaireScores, ({ didPassScoreBar }) => didPassScoreBar);
    }
  }

  @computed
  get stepDisplayName() {
    if (this.currentQuestion.questionnaireType === QuestionnaireTypes.CUT_OFF) {
      return 'סוף שאלון א';
    }
    return this.currentQuestion?.questionnaire;
  }
}
