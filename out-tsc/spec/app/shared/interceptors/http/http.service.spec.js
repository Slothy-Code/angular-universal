"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/common/http/testing");
var http_1 = require("@angular/common/http");
var http_service_1 = require("./http.service");
var http_cache_service_1 = require("./http-cache.service");
var error_handler_interceptor_1 = require("./error-handler.interceptor");
var cache_interceptor_1 = require("./cache.interceptor");
var api_prefix_interceptor_1 = require("./api-prefix.interceptor");
describe('HttpService', function () {
    var httpCacheService;
    var http;
    var httpMock;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule],
            providers: [
                error_handler_interceptor_1.ErrorHandlerInterceptor,
                cache_interceptor_1.CacheInterceptor,
                api_prefix_interceptor_1.ApiPrefixInterceptor,
                http_cache_service_1.HttpCacheService,
                {
                    provide: http_1.HttpClient,
                    useClass: http_service_1.HttpService
                }
            ]
        });
    });
    beforeEach(testing_1.inject([http_1.HttpClient, testing_2.HttpTestingController, http_cache_service_1.HttpCacheService], function (_http, _httpMock, _httpCacheService) {
        http = _http;
        httpMock = _httpMock;
        httpCacheService = _httpCacheService;
    }));
    afterEach(function () {
        httpCacheService.cleanCache();
        httpMock.verify();
    });
    it('should use error handler, API prefix and no cache by default', function () {
        // Arrange
        var interceptors;
        var realRequest = http.request;
        spyOn(http_service_1.HttpService.prototype, 'request').and.callFake(function () {
            interceptors = this.interceptors;
            return realRequest.apply(this, arguments);
        });
        // Act
        var request = http.get('/toto');
        // Assert
        request.subscribe(function () {
            expect(http.request).toHaveBeenCalled();
            expect(interceptors.some(function (i) { return i instanceof api_prefix_interceptor_1.ApiPrefixInterceptor; })).toBeTruthy();
            expect(interceptors.some(function (i) { return i instanceof error_handler_interceptor_1.ErrorHandlerInterceptor; })).toBeTruthy();
            expect(interceptors.some(function (i) { return i instanceof cache_interceptor_1.CacheInterceptor; })).toBeFalsy();
        });
        httpMock.expectOne({}).flush({});
    });
    it('should use cache', function () {
        // Arrange
        var interceptors;
        var realRequest = http.request;
        spyOn(http_service_1.HttpService.prototype, 'request').and.callFake(function () {
            interceptors = this.interceptors;
            return realRequest.apply(this, arguments);
        });
        // Act
        var request = http.cache().get('/toto');
        // Assert
        request.subscribe(function () {
            expect(interceptors.some(function (i) { return i instanceof api_prefix_interceptor_1.ApiPrefixInterceptor; })).toBeTruthy();
            expect(interceptors.some(function (i) { return i instanceof error_handler_interceptor_1.ErrorHandlerInterceptor; })).toBeTruthy();
            expect(interceptors.some(function (i) { return i instanceof cache_interceptor_1.CacheInterceptor; })).toBeTruthy();
        });
        httpMock.expectOne({}).flush({});
    });
    it('should skip error handler', function () {
        // Arrange
        var interceptors;
        var realRequest = http.request;
        spyOn(http_service_1.HttpService.prototype, 'request').and.callFake(function () {
            interceptors = this.interceptors;
            return realRequest.apply(this, arguments);
        });
        // Act
        var request = http.skipErrorHandler().get('/toto');
        // Assert
        request.subscribe(function () {
            expect(interceptors.some(function (i) { return i instanceof api_prefix_interceptor_1.ApiPrefixInterceptor; })).toBeTruthy();
            expect(interceptors.some(function (i) { return i instanceof error_handler_interceptor_1.ErrorHandlerInterceptor; })).toBeFalsy();
            expect(interceptors.some(function (i) { return i instanceof cache_interceptor_1.CacheInterceptor; })).toBeFalsy();
        });
        httpMock.expectOne({}).flush({});
    });
    it('should not use API prefix', function () {
        // Arrange
        var interceptors;
        var realRequest = http.request;
        spyOn(http_service_1.HttpService.prototype, 'request').and.callFake(function () {
            interceptors = this.interceptors;
            return realRequest.apply(this, arguments);
        });
        // Act
        var request = http.disableApiPrefix().get('/toto');
        // Assert
        request.subscribe(function () {
            expect(interceptors.some(function (i) { return i instanceof api_prefix_interceptor_1.ApiPrefixInterceptor; })).toBeFalsy();
            expect(interceptors.some(function (i) { return i instanceof error_handler_interceptor_1.ErrorHandlerInterceptor; })).toBeTruthy();
            expect(interceptors.some(function (i) { return i instanceof cache_interceptor_1.CacheInterceptor; })).toBeFalsy();
        });
        httpMock.expectOne({}).flush({});
    });
});
//# sourceMappingURL=http.service.spec.js.map