import {PhoneType} from './phone.model';

export interface UserType {
  id: number;
  username: string;
  email: string;
  role: string;
  addresses?: string[];
  phones?: string[];
}

export interface ProfileType {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  actualPassword: string;
}

export class Profile implements ProfileType {
  public firstname: string;
  public lastname: string;
  public email: string;
  public actualPassword: string;
  public password: string;
  constructor(firstname: string, lastname: string, email: string, actualPassword: string, password: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.actualPassword = actualPassword;
    this.password = password
  }
}


export interface PasswordType {
  currentPassword: string;
  newPassword: string;
}

export class Password implements PasswordType {
  public currentPassword: string;
  public newPassword: string;
  constructor(currentPassword: string, newPassword: string) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }
}
