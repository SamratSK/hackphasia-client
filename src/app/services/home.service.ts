import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiResponse } from '@interfaces/api.interface';
import { User } from '@interfaces/auth.interface';
import { Course } from '@interfaces/general.interfaces';

type LoginTemplate = { message: string };
type HomeTemplate = {
  user: User;
  certificates: any[];
  badges: any[];
  streak: number;
};

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private BASE = 'https://api.example.com/auth';

  courseSubject: BehaviorSubject<Course | undefined> = new BehaviorSubject<Course | undefined>(undefined);
  
  constructor(private http: HttpClient) {}

  login(cred: {
    email: string;
    password: string;
  }): Observable<ApiResponse<LoginTemplate>> {
    return this.http.post<ApiResponse<LoginTemplate>>(
      `${this.BASE}/login`,
      cred
    );
  }

  setCourse(course: Course) {
    this.courseSubject.next(course);
  }

  // register(data: {
  //   name: string;
  //   email: string;
  //   phone: string;
  //   age: number;
  //   gender: boolean;
  //   preferredLanguage: string;
  // }): Observable<ApiResponse<RegisterTemplate>> {
  //   return this.http.post<ApiResponse<RegisterTemplate>>(
  //     `${this.BASE}/register`,
  //     data
  //   );
  // }

  // logout() {
  //   //TODO: Remove token from server
  //   sessionStorage.removeItem(this.USER_KEY);
  // }

  // loadUser(user: User) {
  //   sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  // }

  // getUser() {
  //   const user = sessionStorage.getItem(this.USER_KEY);
  //   return user ? (JSON.parse(user) as User) : null;
  // }

  // isAuthenticated() {
  //   return sessionStorage.getItem(this.USER_KEY) ? true : false;
  // }

  // pushAuthChanged() {
  //   this.authChanged.next(undefined);
  // }
}
