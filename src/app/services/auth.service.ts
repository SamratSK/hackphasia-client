import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from '@interfaces/api.interface';
import { User } from '@interfaces/auth.interface';

type LoginTemplate = { message: string; name: string };
type RegisterTemplate = { message: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE = 'http://10.80.2.25:5000';
  private USER_KEY = 'APP_USER';

  authChanged = new Subject();

  constructor(private http: HttpClient) {}

  login(cred: {
    email: string;
    password: string;
  }): Observable<LoginTemplate> {
    return this.http.post<LoginTemplate>(
      `${this.BASE}/login`,
      cred
    );
  }

  register(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    age: number;
    gender: boolean;
    preferredLanguage: string;
  }): Observable<RegisterTemplate> {
    return this.http.post<RegisterTemplate>(
      `${this.BASE}/register`,
      data
    );
  }

  logout() {
    //TODO: Remove token from server
    localStorage.removeItem(this.USER_KEY);
  }

  loadUser(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? (JSON.parse(user) as User) : null;
  }

  isAuthenticated() {
    return localStorage.getItem(this.USER_KEY) ? true : false;
  }

  pushAuthChanged() {
    this.authChanged.next(undefined);
  }
}
