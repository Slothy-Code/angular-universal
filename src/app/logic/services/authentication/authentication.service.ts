import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@logic/models/user';
import {environment} from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(form: {name: string, password: string}, remember: boolean) {
    return this.httpClient.post<User>(`${environment.serverUrl}/user/login`, form)
        .pipe(map(user => {
          console.log('siema');
          if (user && user.token) {
            if (remember) {
              localStorage.setItem('currentUser', JSON.stringify(user));
            }
            this.currentUserSubject.next(user);
          }

          return user;
        }));
  }

    refreshToken() {
        return this.httpClient.auth().get<User>(`${environment.serverUrl}/user/refresh-token`)
            .pipe(map(user => {
                console.log(user);

                return user;
            }));
    }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
