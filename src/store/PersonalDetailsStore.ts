import { observable } from 'mobx';

export class PersonalDetailsStore {

  @observable
  firstName?: string;

  @observable
  lastName?: string;

  @observable
  idNumber?: string;

  @observable
  phoneNumber?: string;

  constructor() {}

}
