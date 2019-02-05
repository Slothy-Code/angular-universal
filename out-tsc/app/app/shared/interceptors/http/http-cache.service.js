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
import { each } from 'lodash';
var cachePersistenceKey = 'httpCache';
/**
 * Provides a cache facility for HTTP requests with configurable persistence policy.
 */
var HttpCacheService = /** @class */ (function () {
    function HttpCacheService() {
        this.cachedData = {};
        this.storage = null;
        this.loadCacheData();
    }
    /**
     * Sets the cache data for the specified request.
     * @param url The request URL.
     * @param data The received data.
     * @param lastUpdated The cache last update, current date is used if not specified.
     */
    HttpCacheService.prototype.setCacheData = function (url, data, lastUpdated) {
        this.cachedData[url] = {
            lastUpdated: lastUpdated || new Date(),
            data: data
        };
        this.saveCacheData();
    };
    /**
     * Gets the cached data for the specified request.
     * @param url The request URL.
     * @return The cached data or null if no cached data exists for this request.
     */
    HttpCacheService.prototype.getCacheData = function (url) {
        var cacheEntry = this.cachedData[url];
        if (cacheEntry) {
            return cacheEntry.data;
        }
        return null;
    };
    /**
     * Gets the cached entry for the specified request.
     * @param url The request URL.
     * @return The cache entry or null if no cache entry exists for this request.
     */
    HttpCacheService.prototype.getHttpCacheEntry = function (url) {
        return this.cachedData[url] || null;
    };
    /**
     * Clears the cached entry (if exists) for the specified request.
     * @param url The request URL.
     */
    HttpCacheService.prototype.clearCache = function (url) {
        delete this.cachedData[url];
        this.saveCacheData();
    };
    /**
     * Cleans cache entries older than the specified date.
     * @param expirationDate The cache expiration date. If no date is specified, all cache is cleared.
     */
    HttpCacheService.prototype.cleanCache = function (expirationDate) {
        var _this = this;
        if (expirationDate) {
            each(this.cachedData, function (value, key) {
                if (expirationDate >= value.lastUpdated) {
                    delete _this.cachedData[key];
                }
            });
        }
        else {
            this.cachedData = {};
        }
        this.saveCacheData();
    };
    /**
     * Sets the cache persistence policy.
     * Note that changing the cache persistence will also clear the cache from its previous storage.
     * @param persistence How the cache should be persisted, it can be either local or session storage, or if no value is
     *   provided it will be only in-memory (default).
     */
    HttpCacheService.prototype.setPersistence = function (persistence) {
        this.cleanCache();
        this.storage = persistence === 'local' || persistence === 'session' ? window[persistence + 'Storage'] : null;
        this.loadCacheData();
    };
    HttpCacheService.prototype.saveCacheData = function () {
        if (this.storage) {
            this.storage[cachePersistenceKey] = JSON.stringify(this.cachedData);
        }
    };
    HttpCacheService.prototype.loadCacheData = function () {
        var data = this.storage ? this.storage[cachePersistenceKey] : null;
        this.cachedData = data ? JSON.parse(data) : {};
    };
    HttpCacheService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], HttpCacheService);
    return HttpCacheService;
}());
export { HttpCacheService };
//# sourceMappingURL=http-cache.service.js.map