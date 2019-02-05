"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var router_1 = require("@angular/router");
var authentication_service_1 = require("./authentication.service");
var authentication_service_mock_1 = require("./authentication.service.mock");
var authentication_guard_1 = require("./authentication.guard");
describe('AuthenticationGuard', function () {
    var authenticationGuard;
    var authenticationService;
    var mockRouter;
    var mockSnapshot;
    beforeEach(function () {
        mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };
        mockSnapshot = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);
        testing_1.TestBed.configureTestingModule({
            providers: [
                authentication_guard_1.AuthenticationGuard,
                { provide: authentication_service_1.AuthenticationService, useClass: authentication_service_mock_1.MockAuthenticationService },
                { provide: router_1.Router, useValue: mockRouter }
            ]
        });
    });
    beforeEach(testing_1.inject([authentication_guard_1.AuthenticationGuard, authentication_service_1.AuthenticationService], function (_authenticationGuard, _authenticationService) {
        authenticationGuard = _authenticationGuard;
        authenticationService = _authenticationService;
    }));
    it('should have a canActivate method', function () {
        expect(typeof authenticationGuard.canActivate).toBe('function');
    });
    it('should return true if user is authenticated', function () {
        expect(authenticationGuard.canActivate(null, mockSnapshot)).toBe(true);
    });
    it('should return false and redirect to login if user is not authenticated', function () {
        // Arrange
        authenticationService.credentials = null;
        // Act
        var result = authenticationGuard.canActivate(null, mockSnapshot);
        // Assert
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
            queryParams: { redirect: undefined },
            replaceUrl: true
        });
        expect(result).toBe(false);
    });
    it('should save url as queryParam if user is not authenticated', function () {
        authenticationService.credentials = null;
        mockRouter.url = '/about';
        mockSnapshot.url = '/about';
        authenticationGuard.canActivate(null, mockSnapshot);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
            queryParams: { redirect: mockRouter.url },
            replaceUrl: true
        });
    });
});
//# sourceMappingURL=authentication.guard.spec.js.map