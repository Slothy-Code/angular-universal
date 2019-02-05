"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/common/http");
var http_cache_service_1 = require("./http-cache.service");
var cachePersistenceKey = 'httpCache';
describe('HttpCacheService', function () {
    var httpCacheService;
    var response;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [http_cache_service_1.HttpCacheService]
        });
        // Start fresh
        window.sessionStorage.removeItem(cachePersistenceKey);
        window.localStorage.removeItem(cachePersistenceKey);
    });
    beforeEach(testing_1.inject([http_cache_service_1.HttpCacheService], function (_httpCacheService) {
        httpCacheService = _httpCacheService;
        response = new http_1.HttpResponse({ body: 'data' });
    }));
    afterEach(function () {
        httpCacheService.cleanCache();
    });
    describe('setCacheData', function () {
        it('should set cache data', function () {
            // Act
            httpCacheService.setCacheData('/popo', response);
            // Assert
            expect(httpCacheService.getCacheData('/popo')).toEqual(response);
        });
        it('should replace existing data', function () {
            // Arrange
            var newResponse = new http_1.HttpResponse({ body: 'new data' });
            // Act
            httpCacheService.setCacheData('/popo', response);
            httpCacheService.setCacheData('/popo', newResponse);
            // Assert
            expect(httpCacheService.getCacheData('/popo')).toEqual(newResponse);
        });
        it('should set cache date correctly', function () {
            // Act
            var date = new Date(123);
            httpCacheService.setCacheData('/popo', response, date);
            httpCacheService.setCacheData('/hoho', response);
            // Assert
            expect(httpCacheService.getHttpCacheEntry('/popo').lastUpdated).toBe(date);
            expect(httpCacheService.getHttpCacheEntry('/hoho').lastUpdated).not.toBe(date);
        });
    });
    describe('getCacheData', function () {
        it('should return null if no cache', function () {
            expect(httpCacheService.getCacheData('/hoho')).toBe(null);
        });
        it('should return cached data if exists', function () {
            // Act
            httpCacheService.setCacheData('/hoho', response);
            // Assert
            expect(httpCacheService.getCacheData('/hoho')).toEqual(response);
        });
        it('should return cached data with url parameters if exists', function () {
            // Act
            httpCacheService.setCacheData('/hoho?pif=paf', response);
            // Assert
            expect(httpCacheService.getCacheData('/hoho?pif=paf')).toEqual(response);
        });
    });
    describe('getHttpCacheEntry', function () {
        it('should return null if no cache', function () {
            expect(httpCacheService.getHttpCacheEntry('/hoho')).toBe(null);
        });
        it('should return cached data date  if exists', function () {
            // Arrange
            var date = new Date(123);
            // Act
            httpCacheService.setCacheData('/hoho', response, date);
            var entry = httpCacheService.getHttpCacheEntry('/hoho');
            // Assert
            expect(entry).not.toBeNull();
            expect(entry.lastUpdated).toEqual(date);
            expect(entry.data).toEqual(response);
        });
    });
    describe('clearCacheData', function () {
        it('should clear existing cache data', function () {
            // Set cache
            httpCacheService.setCacheData('/hoho', response);
            expect(httpCacheService.getCacheData('/hoho')).toEqual(response);
            // Clear cache
            httpCacheService.clearCache('/hoho');
            expect(httpCacheService.getCacheData('/hoho')).toBe(null);
        });
        it('should do nothing if no cache exists', function () {
            expect(httpCacheService.getCacheData('/lolo')).toBe(null);
            httpCacheService.clearCache('/hoho');
            expect(httpCacheService.getCacheData('/lolo')).toBe(null);
        });
    });
    describe('cleanCache', function () {
        it('should clear all cache if no date is specified', function () {
            // Set cache
            httpCacheService.setCacheData('/hoho', response);
            httpCacheService.setCacheData('/popo', response);
            expect(httpCacheService.getCacheData('/hoho')).toBe(response);
            expect(httpCacheService.getCacheData('/popo')).toBe(response);
            // Clean cache
            httpCacheService.cleanCache();
            expect(httpCacheService.getCacheData('/hoho')).toBe(null);
            expect(httpCacheService.getCacheData('/popo')).toBe(null);
        });
        it('should clear existing since specified date', function () {
            // Set cache
            httpCacheService.setCacheData('/hoho', response);
            expect(httpCacheService.getCacheData('/hoho')).toBe(response);
            // Clean cache
            httpCacheService.cleanCache(new Date());
            expect(httpCacheService.getCacheData('/hoho')).toBe(null);
        });
        it('should not affect cache entries newer than specified date', function () {
            // Set cache
            httpCacheService.setCacheData('/hoho', response);
            expect(httpCacheService.getCacheData('/hoho')).toBe(response);
            // Clean cache
            var date = new Date();
            httpCacheService.setCacheData('/lolo', response, new Date(date.getTime() + 10));
            httpCacheService.cleanCache(date);
            // Assert
            expect(httpCacheService.getCacheData('/hoho')).toBe(null);
            expect(httpCacheService.getCacheData('/lolo')).toBe(response);
        });
    });
    describe('setPersistence', function () {
        beforeEach(function () {
            httpCacheService.setPersistence();
            httpCacheService.cleanCache = jasmine.createSpy('cleanCache');
        });
        it('should clear previous cache data when persistence value change', function () {
            httpCacheService.setPersistence('local');
            expect(httpCacheService.cleanCache).toHaveBeenCalledWith();
        });
        it('should persist cache to local storage', function () {
            expect(localStorage.getItem(cachePersistenceKey)).toBeNull();
            httpCacheService.setPersistence('local');
            httpCacheService.setCacheData('/hoho', response);
            expect(localStorage.getItem(cachePersistenceKey)).not.toBeNull();
        });
        it('should persist cache to session storage', function () {
            expect(sessionStorage.getItem(cachePersistenceKey)).toBeNull();
            httpCacheService.setPersistence('session');
            httpCacheService.setCacheData('/hoho', response);
            expect(sessionStorage.getItem(cachePersistenceKey)).not.toBeNull();
        });
    });
});
//# sourceMappingURL=http-cache.service.spec.js.map