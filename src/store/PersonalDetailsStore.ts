import { makeAutoObservable } from 'mobx';

export class PersonalDetailsStore {

  firstName: string = "Noam ";

  lastName?: string;

  idNumber?: string;

  phoneNumber?: string;

  constructor() {
    makeAutoObservable(this);
  }

}
