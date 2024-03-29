import { computed, makeAutoObservable } from 'mobx';
import { PersonalDetailsStore } from './PersonalDetailsStore';
import { QuestionnairesStore } from './QuestionnairesStore';
import { QuestionBase } from '../components/questionnaires/base/types';
import { ResultsStore } from './ResultsStore';
import { QuestionnaireTypes } from '../data/data.consts';


export enum APPLICATION_STEP {
  WELCOME = 'WELCOME',
  PERSONAL_DETAILS = 'PERSONAL_DETAILS',
  FIRST_SECTION_INTRO = 'FIRST_SECTION_INTRO',
  QUESTIONNAIRES = 'QUESTIONNAIRES',
  COMPLETED_QUESTIONNAIRES = 'COMPLETED_QUESTIONNAIRES',
  SUMMARY = 'SUMMARY',
}

const APPLICATION_STEPS = [
  APPLICATION_STEP.WELCOME,
  APPLICATION_STEP.PERSONAL_DETAILS,
  APPLICATION_STEP.FIRST_SECTION_INTRO,
  APPLICATION_STEP.QUESTIONNAIRES,
  APPLICATION_STEP.COMPLETED_QUESTIONNAIRES,
  APPLICATION_STEP.SUMMARY,
];

export class ApplicationStateStore {

  personalDetailsStore: PersonalDetailsStore;

  questionnairesStore: QuestionnairesStore;

  resultsStore: ResultsStore;

  step: APPLICATION_STEP = APPLICATION_STEP.WELCOME;

  constructor(questionnaires: QuestionBase[]) {
    makeAutoObservable(this)
    this.personalDetailsStore = new PersonalDetailsStore();
    this.questionnairesStore = new QuestionnairesStore(this.goToSummary.bind(this), this.next.bind(this), questionnaires);
    this.resultsStore = new ResultsStore(this.questionnairesStore);
  }

  @computed
  get stepDisplayName() {
    switch (this.step) {
      case APPLICATION_STEP.WELCOME:
        return 'התחלה';
      case APPLICATION_STEP.PERSONAL_DETAILS:
        return 'שאלות אישיות';
      case APPLICATION_STEP.FIRST_SECTION_INTRO:
        return 'מבוא';
      case APPLICATION_STEP.QUESTIONNAIRES:
        return this.questionnairesStore.stepDisplayName;
      case APPLICATION_STEP.SUMMARY:
        return 'סיכום';
      default:
        return '';
    }
  }

  @computed
  get backText() {
    if (this.step === APPLICATION_STEP.QUESTIONNAIRES
      && this.questionnairesStore.questionnaireIndex !== 0
    && this.questionnairesStore.questionnaireIndex !== this.questionnairesStore.cutoffQuestionIndex + 1) {
      return 'לשאלון הקודם';
    } else {
      return 'לשלב הקודם';
    }
  }

  back() {
    if (this.step === APPLICATION_STEP.QUESTIONNAIRES && this.questionnairesStore.questionnaireIndex !== 0) {
      this.questionnairesStore.previousQuestion();
    } else if (this.step === APPLICATION_STEP.SUMMARY && this.questionnairesStore.skippedSecondSection) {
      this.step = APPLICATION_STEP.QUESTIONNAIRES;
    } else {
      const currentIndex = APPLICATION_STEPS.indexOf(this.step);
      this.step = APPLICATION_STEPS[currentIndex - 1];
    }
  }

  next() {
    const currentIndex = APPLICATION_STEPS.indexOf(this.step);
    this.step = APPLICATION_STEPS[currentIndex + 1];
  }

  goToSummary() {
    this.step = APPLICATION_STEP.SUMMARY;
  }

  skip() {
    if (this.step === APPLICATION_STEP.QUESTIONNAIRES) {
      let randomScore;
      let didPassThreshold;
      if (this.questionnairesStore.currentQuestion.questionnaireType === QuestionnaireTypes.MULTI_DISCRETE_SCALE) {
        randomScore = this.questionnairesStore.currentQuestion.questionnaires?.map((questionnaire) => this._getRandomQuestionScore(questionnaire));
        didPassThreshold = randomScore.some((score, index) => score >= (this.questionnairesStore.currentQuestion.questionnaires?.[index].threshold ?? 0));
      } else if (this.questionnairesStore.currentQuestion.questionnaireType === QuestionnaireTypes.CONDITION_QUESTIONNAIRE) {
        randomScore = this._getRandomQuestionScore(this.questionnairesStore.currentQuestion);
        didPassThreshold = randomScore >= (this.questionnairesStore.currentQuestion.conditionQuestionnaire?.threshold ?? 0);
      } else {
        randomScore = this._getRandomQuestionScore(this.questionnairesStore.currentQuestion);
        didPassThreshold = randomScore >= (this.questionnairesStore.currentQuestion.threshold ?? 0);
      }
      this.questionnairesStore.nextQuestion(undefined, didPassThreshold, randomScore);
    } else {
      this.next();
    }
  }

  private _getRandomQuestionScore(question) {
    const range = this.questionnairesStore.getQuestionnaireRange(question);
    if ('minScore' in range && 'maxScore' in range) {
      return Math.floor(Math.random() * (range.maxScore - range.minScore + 1) + range.minScore);
    } else {
      return Math.floor(Math.random() * 10);
    }
  }
}
