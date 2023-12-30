import { computed, makeAutoObservable } from 'mobx';
import { PersonalDetailsStore } from './PersonalDetailsStore';
import { QuestionnairesStore } from './QuestionnairesStore';

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

  exportToPdf() {
    // TODO - implement
  }
}
