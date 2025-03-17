export class Phone implements PhoneType {
  public id: number;
  public phoneNumber: string;
  public isMain: boolean;
  constructor(id: number, phoneNumber: string, isMain: boolean) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.isMain = isMain;
  }
}

export interface PhoneType {
  id: number,
  phoneNumber: string,
  isMain: boolean
}
