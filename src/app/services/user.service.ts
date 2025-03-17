import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PasswordType, ProfileType } from '../models/user.model';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = API_URL + '/user';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  updateUser(user: ProfileType): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, user);
  }

  updatePassword(password: PasswordType): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/password`, password);
  }

  getPhones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/phones`);
  }

  addPhone(phone: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/phones`, phone);
  }

  updatePhone(phone: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/phones/${phone.id}`, phone);
  }

  deletePhone(phoneId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/phones/${phoneId}`);
  }

  setPhoneAsMain(phoneId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/phones/${phoneId}/main`, {});
  }

  getAddresses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/addresses`);
  }

  addAddress(address: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addresses`, address);
  }

  updateAddress(address: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/addresses/${address.id}`, address);
  }

  deleteAddress(addressId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/addresses/${addressId}`);
  }

  setAddressAsMain(addressId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/addresses/${addressId}/main`, {});
  }
}
