import { makeAutoObservable } from 'mobx';

export class QuestionnairesStore {

  constructor() {
    makeAutoObservable(this);
  }

}
