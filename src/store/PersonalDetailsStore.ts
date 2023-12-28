import { makeAutoObservable } from 'mobx';

export class PersonalDetailsStore {

  firstName: string = "";

  lastName: string = "";

  gender: string = "";

  age: string = "";

  familyStatus: string = "";

  childNumber: string = "";

  generalHealthStatus: string = "";

  generalState: string = "";

  generalMentalHealthState: string = "";

  drugsUsage: string = "";

  constructor() {
    makeAutoObservable(this);
  }

}
