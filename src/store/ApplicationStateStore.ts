import { observable } from 'mobx';
import { PersonalDetailsStore } from './PersonalDetailsStore';
import { QuestionnairesStore } from './QuestionnairesStore';

export enum APPLICATION_STEP {
  WELCOME = 'WELCOME',
  PERSONAL_DETAILS = 'PERSONAL_DETAILS',
  QUESTIONNAIRES = 'QUESTIONNAIRES',
  SUMMARY = 'SUMMARY',
}

export class ApplicationStateStore {

  @observable
  personalDetailsStore: PersonalDetailsStore;

  @observable
  questionnairesStore: QuestionnairesStore;

  @observable
  step: APPLICATION_STEP = APPLICATION_STEP.WELCOME;

  constructor() {
    this.personalDetailsStore = new PersonalDetailsStore();
    this.questionnairesStore = new QuestionnairesStore();
  }

}
