import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {Role, User} from '../models/role.model';


const API_URL = environment.apiUrl;
const USER_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/login`, {email, password}, httpOptions);
  }

  register(firstname:string, lastname:string, email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/register`, {email, password}, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(`${API_URL}/auth/logout`, {}, httpOptions);
  }

  refreshToken() {
    return this.http.post(`${API_URL}/auth/refreshtoken`, {}, httpOptions);
  }

  clean(): void {
    if (this.isBrowser) {
      window.sessionStorage.clear();
    }
  }

  saveUser(user: any): void {
    if (this.isBrowser) {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): User {
    if (this.isBrowser) {
      const user = window.sessionStorage.getItem(USER_KEY);
      if(user){
        return JSON.parse(user);
      }
    }
    return {
      email: '',
      firstname: '',
      lastname: '',
      role: Role.GUEST,
      authenticated: false,
      tokenExpiresAt: new Date()
    };
  }

  getRole(): Role {
    const user = this.getUser();
    return user.role;
  }

  hasRole(requiredRoles: Role[]): boolean {
    const userRole = this.getRole();
    return requiredRoles.includes(userRole);
  }

  isLoggedIn(): boolean {
    const user = this.getUser();
    return user.authenticated;
  }
}
