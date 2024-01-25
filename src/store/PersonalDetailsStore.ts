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

  supportCircle: string = "";

  mentalTreatmentPast: string | undefined;

  mentalTreatmentNow: string | undefined;

  drugsUsage: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setProperty(propertyName: string, value: string) {
    this[propertyName] = value;
  }

  @computed
  get summary(): Record<string, string | undefined> {
    return {
      "שם פרטי": this.firstName,
      "שם משפחה": this.lastName,
      "מגדר": this.gender,
      "גיל": this.age,
      "מצב משפחתי": this.familyStatus,
      "מספר ילדים": this.childNumber,
      "מצב בריאות כללי": this.generalHealthStatus,
      "מצב כללי": this.generalState,
      "מעגלי תמיכה": this.supportCircle,
      "טיפול נפשי בעבר": this.mentalTreatmentPast,
      "טיפול נפשי כיום": this.mentalTreatmentNow,
      "טיפול נפשי תרופתי": this.drugsUsage,
    }
  }

}
