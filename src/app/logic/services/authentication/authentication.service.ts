import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '@logic/models/user';
import {environment} from '@env/environment';
import {Token} from '@logic/models/token';

interface DecodedJWT {
    exp: number;
    iat: number;
    _id: string;
    name: string;
    role: string;
}


@Injectable({providedIn: 'root'})
export class AuthenticationService {

    constructor(private httpClient: HttpClient) {
    }

    login(form: { username: string, password: string }) {
        return this.httpClient.post<User>(`${environment.serverUrl}/user/login`, form)
            .pipe(map(data => this.getUserData(data.token)));
    }

    getPermissions(): Observable<string[]> {
        return this.httpClient.get<string[]>(`${environment.serverUrl}/user/permissions`);
    }

    restoreSession(token: Token) {
        return of(this.getUserData(token.token));
    }

    refreshToken() {
        return this.httpClient.get<User>(`${environment.serverUrl}/user/refresh-token`)
            .pipe(map(data => this.getUserData(data.token)));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    private getUserData(token: string) {
        const decodedJWT: DecodedJWT = this.parseJwt(token);
        return {
            _id: decodedJWT._id,
            name: decodedJWT.name,
            role: decodedJWT.role,
            token: {token: token, exp: decodedJWT.exp, iat: decodedJWT.iat}
        };
    }

    private parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        console.log(JSON.parse(window.atob(base64)));
        return JSON.parse(window.atob(base64));
    }
}
