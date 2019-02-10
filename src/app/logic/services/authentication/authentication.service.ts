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
            .pipe(map(data => {
                const decodedJWT: DecodedJWT = this.parseJwt(data.token);
                return {name: decodedJWT.name, role: decodedJWT.role, token: {token: data.token, exp: decodedJWT.exp, iat: decodedJWT.iat}};
            }));
    }

    getPermissions(): Observable<string[]> {
        return this.httpClient.get<string[]>(`${environment.serverUrl}/user/permissions`);
    }

    restoreSession(token: Token) {
        const decodedToken = this.parseJwt(token.token);
        return of({name: decodedToken.name, role: decodedToken.role, token: token});
    }

    refreshToken() {
        return this.httpClient.auth().get<User>(`${environment.serverUrl}/user/refresh-token`)
            .pipe(map(user => {

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    private parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
}
