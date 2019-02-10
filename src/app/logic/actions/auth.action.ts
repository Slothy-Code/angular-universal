import {Action} from '@ngrx/store';
import {Token} from '@logic/models/token';

export const USER_LOGIN = '[Auth] USER_LOGIN';
export const USER_LOGIN_SUCCESS = '[Auth] USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = '[Auth] USER_LOGIN_FAILED';

export const USER_FETCH_PERMISSIONS = '[Auth] USER_FETCH_PERMISSIONS';
export const USER_FETCH_PERMISSIONS_SUCCESS = '[Auth] USER_FETCH_PERMISSIONS_SUCCESS';
export const USER_FETCH_PERMISSIONS_FAIL = '[Auth] USER_FETCH_PERMISSIONS_FAIL';

export const USER_RESTORE_SESSION = '[Auth] USER_RESTORE_SESSION';

export const USER_LOGOUT = '[Auth] USER_LOGOUT';


export class UserLogin implements Action {
    readonly type = USER_LOGIN;

    constructor(public payload: { password: string, username: string, remember?: boolean }) {
    }
}

export class UserLoginSuccess implements Action {
    readonly type = USER_LOGIN_SUCCESS;

    constructor(public payload: any, public remember = false) {
    }
}

export class UserLoginFail implements Action {
    readonly type = USER_LOGIN_FAIL;

    constructor(public payload: any) {
    }
}

export class UserRestoreSession implements Action {
    readonly type = USER_RESTORE_SESSION;

    constructor(public token: Token) {
    }
}

export class UserLogout implements Action {
    readonly type = USER_LOGOUT;

    constructor() {
    }
}


export class UserFetchPermissions implements Action {
    readonly type = USER_FETCH_PERMISSIONS;

    constructor() {
    }
}

export class UserFetchPermissionsSuccess implements Action {
    readonly type = USER_FETCH_PERMISSIONS_SUCCESS;

    constructor(public payload: string[]) {
    }
}

export class UserFetchPermissionsFail implements Action {
    readonly type = USER_FETCH_PERMISSIONS_FAIL;

    constructor(public error: any) {
    }
}


export type Actions =
    | UserLogin
    | UserLoginSuccess
    | UserLoginFail
    | UserFetchPermissions
    | UserFetchPermissionsSuccess
    | UserFetchPermissionsFail
    | UserRestoreSession
    | UserLogout;