import {Action} from '@ngrx/store';

export const USER_LOGIN = '[Auth] USER_LOGIN';
export const USER_LOGIN_SUCCESS = '[Auth] USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = '[Auth] USER_LOGIN_FAILED';

export class UserLogin implements Action {
    readonly type = USER_LOGIN;

    constructor(public payload: { password: string, username: string }) {
    }
}

export class UserLoginSuccess implements Action {
    readonly type = USER_LOGIN_SUCCESS;

}

export class UserLoginFailed implements Action {
    readonly type = USER_LOGIN_FAILED;

    constructor(public payload: any) {
    }
}


export type Actions =
    | UserLogin
    | UserLoginSuccess
    | UserLoginFailed;
