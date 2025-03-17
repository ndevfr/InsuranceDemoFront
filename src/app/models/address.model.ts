export class Address implements AddressType {
  public id: number;
  public street: string;
  public complement: string;
  public zipCode: string;
  public city: string;
  public country: string;
  public isMain: boolean;
  constructor(id: number, street: string, complement: string, zipCode: string, city: string, country: string, isMain: boolean) {
    this.id = id;
    this.street = street;
    this.complement = complement;
    this.zipCode = zipCode;
    this.city = city;
    this.country = country;
    this.isMain = isMain;
  }
}

export interface AddressType {
  id: number,
  street: string,
  complement: string,
  zipCode: string,
  city: string,
  country: string,
  isMain: boolean
}
