var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@logic/services/authentication/authentication.service';
var AuthenticationGuard = /** @class */ (function () {
    function AuthenticationGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    AuthenticationGuard.prototype.canActivate = function (route, state) {
        if (this.authenticationService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
        return false;
    };
    AuthenticationGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router, AuthenticationService])
    ], AuthenticationGuard);
    return AuthenticationGuard;
}());
export { AuthenticationGuard };
//# sourceMappingURL=authentication.guard.js.map