import { action, makeAutoObservable } from 'mobx';

export class PersonalDetailsStore {

  firstName: string = "";

  lastName: string = "";

  gender: string | undefined;

  age: string = "";

  familyStatus: string | undefined;

  childNumber: string = "";

  generalHealthStatus: string = "";

  generalState: string = "";

  generalMentalHealthState: string = "";

  drugsUsage: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setProperty(propertyName: string, value: string) {
    this[propertyName] = value;
  }

}
