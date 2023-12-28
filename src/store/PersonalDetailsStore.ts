import { makeAutoObservable } from 'mobx';
import { DropdownOption } from '../components/types';

export class PersonalDetailsStore {

  firstName: string = "";

  lastName: string = "";

  gender: DropdownOption | undefined;

  age: string = "";

  familyStatus: DropdownOption | undefined;

  childNumber: string = "";

  generalHealthStatus: string = "";

  generalState: string = "";

  generalMentalHealthState: string = "";

  drugsUsage: string = "";

  constructor() {
    makeAutoObservable(this);
  }

}
