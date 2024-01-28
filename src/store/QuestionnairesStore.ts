import { action, computed, makeAutoObservable } from 'mobx';
import _ from 'lodash';
import { QuestionBase } from '../components/questionnaires/base/types';
import { QuestionnaireRange } from './types';
import { QuestionnaireTypes } from '../data/data.consts';

export class QuestionnairesStore {

  questionnaireIndex: number = 0;
  questionnaireScores = Array<{ score: number | string; didPassThreshold: boolean; }>(this.questions.length);
  questionnairesStates = Array<unknown>(this.questions.length);
  skippedSecondSection: boolean = false;

  constructor(public skipToSummary: () => void, private completedQuestionnaires: () => void, public questions: QuestionBase[]) {
    makeAutoObservable(this);
  }

  @computed
  get currentQuestion(): QuestionBase {
    return this.questions[this.questionnaireIndex];
  }

  @computed
  get analyticsData() {
    return {
      currentQuestionnaireName: this.currentQuestion.questionnaire,
      nextQuestionnaireName: this.questions[this.questionnaireIndex + 1]?.questionnaire,
    };
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
  get questionnaireContext() {
    return  {
      progress: this.progress,
      maxProgress: this.maxProgress,
      verbalProgress: this.verbalProgress,
    }
  }

  @computed
  get requiresSecondSection(): boolean {
    if (this.questionnaireIndex < this.cutoffQuestionIndex) {
      return false;
    }
    return this.questionnaireScores.slice(0, this.cutoffQuestionIndex).some(({ didPassThreshold }) => didPassThreshold);
  }

  @computed
  get stepDisplayName() {
    if (this.currentQuestion.questionnaireType === QuestionnaireTypes.CUT_OFF) {
      return 'סוף חלק א';
    }
    return this.currentQuestion?.questionnaire;
  }

  public getQuestionnaireRange(question): QuestionnaireRange | {} {
    switch (question.questionnaireType) {
      case QuestionnaireTypes.MIN_MAX_SCALE:
        return {
          threshold: question.threshold,
          maxScore: question.max,
          minScore: question.min,
        };
      case QuestionnaireTypes.DISCRETE_SCALE:
        const subQuestionsCount = question.questions.length;
        return {
          threshold: question.threshold,
          maxScore: _.maxBy(question.answers, 'value').value * subQuestionsCount,
          minScore: _.minBy(question.answers, 'value').value * subQuestionsCount,
        };
      case QuestionnaireTypes.YES_NO:
        return {
          threshold: question.threshold,
          maxScore: question.questions.length,
          minScore: 0,
        };
      case QuestionnaireTypes.CONDITION_QUESTIONNAIRE:
        return this.getQuestionnaireRange(question.conditionQuestionnaire);
      case QuestionnaireTypes.TRUE_FALSE:
        return {
          threshold: 1,
          maxScore: 1,
          minScore: 0,
        };
      default:
        return {};
    }
  }

  @action
  previousQuestion() {
    this.questionnaireIndex--;
  }

  @action
  nextQuestion(currentState: unknown, didPassThreshold: boolean, score?: number | string) {
    const conditionQuestionFalseAnswer = this._isConditionQuestionWithFalseAnswer(score);
    if (this.currentQuestion?.questionnaireType !== QuestionnaireTypes.CUT_OFF && !conditionQuestionFalseAnswer) {
      this.questionnairesStates[this.questionnaireIndex] = currentState;
      this.questionnaireScores[this.questionnaireIndex] = { score: score ?? 0, didPassThreshold };
    }
    const finishedAllQuestionnaires = this.questionnaireIndex === this.questions.length - 1;
    if (finishedAllQuestionnaires) {
      this.completedQuestionnaires();
      return;
    }
    this.questionnaireIndex++;
    if (this.currentQuestion?.questionnaireType === QuestionnaireTypes.CUT_OFF) {
      this.questionnairesStates[this.questionnaireIndex] =
        _.some(this.questionnaireScores.slice(0, this.cutoffQuestionIndex), ({ didPassThreshold }) => didPassThreshold);
    }
  }


  private _isConditionQuestionWithFalseAnswer(score?: number | string) {
    return this.currentQuestion?.questionnaireType === QuestionnaireTypes.CONDITION_QUESTIONNAIRE && score === undefined;
  }
}
