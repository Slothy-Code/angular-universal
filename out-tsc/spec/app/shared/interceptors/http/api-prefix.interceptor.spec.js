"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/common/http/testing");
var http_1 = require("@angular/common/http");
var environment_1 = require("@env/environment");
var api_prefix_interceptor_1 = require("./api-prefix.interceptor");
describe('ApiPrefixInterceptor', function () {
    var http;
    var httpMock;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: api_prefix_interceptor_1.ApiPrefixInterceptor,
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
    it('should prepend environment.serverUrl to the request url', function () {
        // Act
        http.get('/toto').subscribe();
        // Assert
        httpMock.expectOne({ url: environment_1.environment.serverUrl + '/toto' });
    });
    it('should not prepend environment.serverUrl to request url', function () {
        // Act
        http.get('hTtPs://domain.com/toto').subscribe();
        // Assert
        httpMock.expectOne({ url: 'hTtPs://domain.com/toto' });
    });
});
//# sourceMappingURL=api-prefix.interceptor.spec.js.map