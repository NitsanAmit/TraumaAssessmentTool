import { action, computed, makeAutoObservable } from 'mobx';

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

  @computed
  get summary() {
    return {
      "שם פרטי": this.firstName,
      "שם משפחה": this.lastName,
      "מגדר": this.gender,
      "גיל": this.age,
      "מצב משפחתי": this.familyStatus,
      "מספר ילדים": this.childNumber,
      "מצב בריאות כללי": this.generalHealthStatus,
      "מצב כללי": this.generalState,
      "מצב נפשי": this.generalMentalHealthState,
      "שימוש בסמים": this.drugsUsage,
    }
  }

}
