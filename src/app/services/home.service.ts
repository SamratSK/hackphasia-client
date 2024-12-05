import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@interfaces/auth.interface';
import { Course } from '@interfaces/general.interfaces';

type HomeTemplate = {
  user: User;
  certificates: any[];
  badges: any[];
  courses: any[];
  streak: number;
};


@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private BASE = 'http://10.80.2.25:5000';

  courseSubject: BehaviorSubject<Course | undefined> = new BehaviorSubject<Course | undefined>(undefined);
  user: User | null= null;

  constructor(private http: HttpClient) {}

  home(cred: {
    name: string;
  }): Observable<HomeTemplate> {
    return this.http.post<HomeTemplate>(
      `${this.BASE}`,
      cred
    );
  }

  transcript(cred: {
    name: string;
    url: string;
  }): Observable<any[]> {
    return this.http.post<any[]>(
      `${this.BASE}/video`,
      cred
    );
  }

  leaderboard() {
    return this.http.get<any[]>(
      `${this.BASE}/leaderboard`
    );
  }

  courseCompleted(cred: {
    name: string,
    title: string,
  }) {
    return this.http.post<any[]>(
      `${this.BASE}/cc`,
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
