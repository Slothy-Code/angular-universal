export var USER_LOGIN = '[Auth] USER_LOGIN';
export var USER_LOGIN_SUCCESS = '[Auth] USER_LOGIN_SUCCESS';
export var USER_LOGIN_FAILED = '[Auth] USER_LOGIN_FAILED';
var UserLogin = /** @class */ (function () {
    function UserLogin(payload) {
        this.payload = payload;
        this.type = USER_LOGIN;
    }
    return UserLogin;
}());
export { UserLogin };
var UserLoginSuccess = /** @class */ (function () {
    function UserLoginSuccess() {
        this.type = USER_LOGIN_SUCCESS;
    }
    return UserLoginSuccess;
}());
export { UserLoginSuccess };
var UserLoginFailed = /** @class */ (function () {
    function UserLoginFailed(payload) {
        this.payload = payload;
        this.type = USER_LOGIN_FAILED;
    }
    return UserLoginFailed;
}());
export { UserLoginFailed };
//# sourceMappingURL=auth.action.js.map