import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthenticationService} from '@logic/services/authentication/authentication.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {
    USER_FETCH_PERMISSIONS,
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_RESTORE_SESSION,
    UserFetchPermissions,
    UserFetchPermissionsFail,
    UserFetchPermissionsSuccess,
    UserLogin,
    UserLoginFail,
    UserLoginSuccess,
    UserLogout,
    UserRestoreSession
} from '@logic/actions/auth.action';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';

@Injectable()
export class AuthEffects {

    @Effect()
    login$: Observable<Action> = this.actions$
        .pipe(ofType(USER_LOGIN),
            mergeMap((action: UserLogin) =>
                this.authService.login(action.payload)
                    .pipe(mergeMap((decodedJWT: any) => [
                            new UserLoginSuccess(decodedJWT, action.payload.remember),
                            new UserFetchPermissions()
                        ]),
                        catchError(error => of(new UserLoginFail(error)))
                    ))
        );

    @Effect({dispatch: false})
    loginSuccess$: Observable<Action> = this.actions$
        .pipe(ofType(USER_LOGIN_SUCCESS),
            tap((action: UserLoginSuccess) => {
                if (action.remember) {
                    localStorage.setItem('currentUser', JSON.stringify(action.payload.token));
                }
            }));

    @Effect({dispatch: false})
    logout$: Observable<Action> = this.actions$
        .pipe(ofType(USER_LOGOUT),
            tap((action: UserLogout) => {
                localStorage.removeItem('currentUser');
            }));

    @Effect()
    restoreSession$: Observable<Action> = this.actions$
        .pipe(ofType(USER_RESTORE_SESSION),
            mergeMap((action: UserRestoreSession) =>
                this.authService.restoreSession(action.token)
                    .pipe(mergeMap((decodedJWT: any) => [
                            new UserLoginSuccess(decodedJWT),
                            new UserFetchPermissions()
                        ])
                    ))
        );

    @Effect()
    fetchPermissions$: Observable<Action> = this.actions$
        .pipe(ofType(USER_FETCH_PERMISSIONS),
            mergeMap((action => {
                return this.authService.getPermissions()
                    .pipe(map((permissions: string[]) =>
                            new UserFetchPermissionsSuccess(permissions)),
                        catchError((error => of(new UserFetchPermissionsFail(error))))
                    );
            }))
        );

    constructor(private actions$: Actions, private authService: AuthenticationService) {
    }
}
