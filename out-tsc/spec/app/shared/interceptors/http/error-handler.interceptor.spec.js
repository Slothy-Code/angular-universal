"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/common/http/testing");
var http_1 = require("@angular/common/http");
var error_handler_interceptor_1 = require("./error-handler.interceptor");
describe('ErrorHandlerInterceptor', function () {
    var errorHandlerInterceptor;
    var http;
    var httpMock;
    function createInterceptor() {
        errorHandlerInterceptor = new error_handler_interceptor_1.ErrorHandlerInterceptor();
        return errorHandlerInterceptor;
    }
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useFactory: createInterceptor,
                    multi: true
                }
            ]
        });
    });
    beforeEach(testing_1.inject([http_1.HttpClient, testing_2.HttpTestingController], function (_http, _httpMock) {
        http = _http;
        httpMock = _httpMock;
    }));
    afterEach(function () {
        httpMock.verify();
    });
    it('should catch error and call error handler', function () {
        // Arrange
        // Note: here we spy on private method since target is customization here,
        // but you should replace it by actual behavior in your app
        spyOn(error_handler_interceptor_1.ErrorHandlerInterceptor.prototype, 'errorHandler').and.callThrough();
        // Act
        http.get('/toto').subscribe(function () { return fail('should error'); }, function () {
            // Assert
            expect(error_handler_interceptor_1.ErrorHandlerInterceptor.prototype['errorHandler']).toHaveBeenCalled();
        });
        httpMock.expectOne({}).flush(null, {
            status: 404,
            statusText: 'error'
        });
    });
});
//# sourceMappingURL=error-handler.interceptor.spec.js.map