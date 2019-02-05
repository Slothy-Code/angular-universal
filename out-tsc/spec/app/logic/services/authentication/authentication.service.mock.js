"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var MockAuthenticationService = /** @class */ (function () {
    function MockAuthenticationService() {
        this.credentials = {
            username: 'test',
            token: '123'
        };
    }
    MockAuthenticationService.prototype.login = function (context) {
        return rxjs_1.of({
            username: context.username,
            token: '123456'
        });
    };
    MockAuthenticationService.prototype.logout = function () {
        this.credentials = null;
        return rxjs_1.of(true);
    };
    MockAuthenticationService.prototype.isAuthenticated = function () {
        return !!this.credentials;
    };
    return MockAuthenticationService;
}());
exports.MockAuthenticationService = MockAuthenticationService;
//# sourceMappingURL=authentication.service.mock.js.map