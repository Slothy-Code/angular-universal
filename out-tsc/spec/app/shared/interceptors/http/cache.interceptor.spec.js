"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/common/http/testing");
var http_1 = require("@angular/common/http");
var cache_interceptor_1 = require("./cache.interceptor");
var http_cache_service_1 = require("./http-cache.service");
describe('CacheInterceptor', function () {
    var interceptorOptions = {};
    var httpCacheService;
    var cacheInterceptor;
    var http;
    var httpMock;
    function createInterceptor(_httpCacheService) {
        cacheInterceptor = new cache_interceptor_1.CacheInterceptor(_httpCacheService).configure(interceptorOptions);
        return cacheInterceptor;
    }
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule],
            providers: [
                http_cache_service_1.HttpCacheService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useFactory: createInterceptor,
                    deps: [http_cache_service_1.HttpCacheService],
                    multi: true
                }
            ]
        });
    });
    afterEach(function () {
        httpCacheService.cleanCache();
        httpMock.verify();
    });
    describe('with default configuration', function () {
        beforeEach(function () {
            interceptorOptions = null;
        });
        beforeEach(testing_1.inject([http_1.HttpClient, testing_2.HttpTestingController, http_cache_service_1.HttpCacheService], function (_http, _httpMock, _httpCacheService) {
            http = _http;
            httpMock = _httpMock;
            httpCacheService = _httpCacheService;
        }));
        it('should cache the request', function () {
            // Act
            http.get('/toto').subscribe(function () {
                // Assert
                var cachedData = httpCacheService.getCacheData('/toto');
                expect(cachedData).toBeDefined();
                expect(cachedData ? cachedData.body : null).toEqual('someData');
            });
            httpMock.expectOne({ url: '/toto' }).flush('someData');
        });
        it('should respond from the cache', function () {
            // Arrange
            httpCacheService.setCacheData('/toto', new http_1.HttpResponse({ body: 'cachedData' }));
            // Act
            http.get('/toto').subscribe(function (response) {
                // Assert
                expect(response).toEqual('cachedData');
            });
            httpMock.expectNone({ url: '/toto' });
        });
        it('should not cache the request in case of error', function () {
            // Act
            http.get('/toto').subscribe(function () { }, function () {
                // Assert
                expect(httpCacheService.getCacheData('/toto')).toBeNull();
            });
            httpMock.expectOne({}).flush(null, {
                status: 404,
                statusText: 'error'
            });
        });
    });
    describe('with update forced configuration', function () {
        beforeEach(function () {
            interceptorOptions = { update: true };
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
        it('should force cache update', function () {
            // Arrange
            httpCacheService.setCacheData('/toto', new http_1.HttpResponse({ body: 'oldCachedData' }));
            cacheInterceptor.configure({ update: true });
            // Act
            http.get('/toto').subscribe(function (response) {
                // Assert
                expect(response).toEqual('newData');
            });
            httpMock.expectOne({ url: '/toto' }).flush('newData');
        });
    });
});
//# sourceMappingURL=cache.interceptor.spec.js.map