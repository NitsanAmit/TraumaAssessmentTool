import { computed, makeAutoObservable } from 'mobx';
import { PersonalDetailsStore } from './PersonalDetailsStore';
import { QuestionnairesStore } from './QuestionnairesStore';
import { exportToPdf } from './pdf-utils';
import { QuestionnaireTypes } from '../components/questionnaires/base/types';


export enum APPLICATION_STEP {
  WELCOME = 'WELCOME',
  PERSONAL_DETAILS = 'PERSONAL_DETAILS',
  QUESTIONNAIRES = 'QUESTIONNAIRES',
  SUMMARY = 'SUMMARY',
}

const APPLICATION_STEPS = [
  APPLICATION_STEP.WELCOME,
  APPLICATION_STEP.PERSONAL_DETAILS,
  APPLICATION_STEP.QUESTIONNAIRES,
  APPLICATION_STEP.SUMMARY,
];

export class ApplicationStateStore {

  personalDetailsStore: PersonalDetailsStore;

  questionnairesStore: QuestionnairesStore;

  step: APPLICATION_STEP = APPLICATION_STEP.WELCOME;

  constructor() {
    makeAutoObservable(this)
    this.personalDetailsStore = new PersonalDetailsStore();
    this.questionnairesStore = new QuestionnairesStore(this.next.bind(this));
  }

  @computed
  get stepDisplayName() {
    switch (this.step) {
      case APPLICATION_STEP.WELCOME:
        return 'התחלה';
      case APPLICATION_STEP.PERSONAL_DETAILS:
        return 'פרטים אישיים';
      case APPLICATION_STEP.QUESTIONNAIRES:
        return this.questionnairesStore.stepDisplayName;
      case APPLICATION_STEP.SUMMARY:
        return 'סיכום';
      default:
        return '';
    }
  }

  back() {
    if (this.step === APPLICATION_STEP.QUESTIONNAIRES && this.questionnairesStore.questionnaireIndex !== 0) {
      this.questionnairesStore.previousQuestion();
    } else {
      const currentIndex = APPLICATION_STEPS.indexOf(this.step);
      this.step = APPLICATION_STEPS[currentIndex - 1];
    }
  }

  next() {
    const currentIndex = APPLICATION_STEPS.indexOf(this.step);
    this.step = APPLICATION_STEPS[currentIndex + 1];
  }

  skip() {
    if (this.step === APPLICATION_STEP.QUESTIONNAIRES) {
      let randomScore;
      if (this.questionnairesStore.currentQuestion.questionnaireType === QuestionnaireTypes.MULTI_DISCRETE_SCALE) {
        // @ts-expect-error
        randomScore = this.questionnairesStore.currentQuestion.questionnaires.map(() => Math.round(Math.random() * 10));
      } else {
        randomScore = Math.round(Math.random() * 10);
      }
      this.questionnairesStore.nextQuestion(undefined, Math.random() > 0.5, randomScore);
    } else {
      this.next();
    }
  }

  async exportToPdf(includePersonalDetails: boolean) {
    return exportToPdf(includePersonalDetails, this.questionnairesStore.summary, this.personalDetailsStore.summary);
  }
}
