import { observable } from 'mobx';
import { PersonalDetailsStore } from './PersonalDetailsStore';
import { QuestionnairesStore } from './QuestionnairesStore';

export class ApplicationStateStore {

  @observable
  personalDetailsStore: PersonalDetailsStore;

  @observable
  questionnairesStore: QuestionnairesStore;

  constructor() {
    this.personalDetailsStore = new PersonalDetailsStore();
    this.questionnairesStore = new QuestionnairesStore();
  }

}
