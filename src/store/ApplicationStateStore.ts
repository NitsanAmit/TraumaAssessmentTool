import { makeAutoObservable, observable } from 'mobx';
import { PersonalDetailsStore } from './PersonalDetailsStore';
import { QuestionnairesStore } from './QuestionnairesStore';

export enum APPLICATION_STEP {
  WELCOME = 'WELCOME',
  PERSONAL_DETAILS = 'PERSONAL_DETAILS',
  QUESTIONNAIRES = 'QUESTIONNAIRES',
  SUMMARY = 'SUMMARY',
}

export class ApplicationStateStore {

  personalDetailsStore: PersonalDetailsStore;

  questionnairesStore: QuestionnairesStore;

  step: APPLICATION_STEP = APPLICATION_STEP.WELCOME;

  constructor() {
    makeAutoObservable(this)
    this.personalDetailsStore = new PersonalDetailsStore();
    this.questionnairesStore = new QuestionnairesStore();
  }

  onWelcomeFinished(): void {
     this.step = APPLICATION_STEP.PERSONAL_DETAILS;
  }
  onPersonalDetailsFinished(): void {
    this.step = APPLICATION_STEP.QUESTIONNAIRES;
  } 
}
