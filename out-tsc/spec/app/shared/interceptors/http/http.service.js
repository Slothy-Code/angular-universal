"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var error_handler_interceptor_1 = require("./error-handler.interceptor");
var cache_interceptor_1 = require("./cache.interceptor");
var api_prefix_interceptor_1 = require("./api-prefix.interceptor");
// From @angular/common/http/src/interceptor: allows to chain interceptors
var HttpInterceptorHandler = /** @class */ (function () {
    function HttpInterceptorHandler(next, interceptor) {
        this.next = next;
        this.interceptor = interceptor;
    }
    HttpInterceptorHandler.prototype.handle = function (request) {
        return this.interceptor.intercept(request, this.next);
    };
    return HttpInterceptorHandler;
}());
/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * Except for very specific needs, you should better configure these interceptors directly in the constructor below
 * for better readability.
 *
 * For static interceptors that should always be enabled (like ApiPrefixInterceptor), use the standard
 * HTTP_INTERCEPTORS token.
 */
exports.HTTP_DYNAMIC_INTERCEPTORS = new core_1.InjectionToken('HTTP_DYNAMIC_INTERCEPTORS');
/**
 * Extends HttpClient with per request configuration using dynamic interceptors.
 */
var HttpService = /** @class */ (function (_super) {
    __extends(HttpService, _super);
    function HttpService(httpHandler, injector, interceptors) {
        if (interceptors === void 0) { interceptors = []; }
        var _this = _super.call(this, httpHandler) || this;
        _this.httpHandler = httpHandler;
        _this.injector = injector;
        _this.interceptors = interceptors;
        if (!_this.interceptors) {
            // Configure default interceptors that can be disabled here
            _this.interceptors = [_this.injector.get(api_prefix_interceptor_1.ApiPrefixInterceptor), _this.injector.get(error_handler_interceptor_1.ErrorHandlerInterceptor)];
        }
        return _this;
    }
    HttpService_1 = HttpService;
    HttpService.prototype.cache = function (forceUpdate) {
        var cacheInterceptor = this.injector.get(cache_interceptor_1.CacheInterceptor).configure({ update: forceUpdate });
        return this.addInterceptor(cacheInterceptor);
    };
    HttpService.prototype.skipErrorHandler = function () {
        return this.removeInterceptor(error_handler_interceptor_1.ErrorHandlerInterceptor);
    };
    HttpService.prototype.disableApiPrefix = function () {
        return this.removeInterceptor(api_prefix_interceptor_1.ApiPrefixInterceptor);
    };
    // Override the original method to wire interceptors when triggering the request.
    HttpService.prototype.request = function (method, url, options) {
        var handler = this.interceptors.reduceRight(function (next, interceptor) { return new HttpInterceptorHandler(next, interceptor); }, this.httpHandler);
        return new http_1.HttpClient(handler).request(method, url, options);
    };
    HttpService.prototype.removeInterceptor = function (interceptorType) {
        return new HttpService_1(this.httpHandler, this.injector, this.interceptors.filter(function (i) { return !(i instanceof interceptorType); }));
    };
    HttpService.prototype.addInterceptor = function (interceptor) {
        return new HttpService_1(this.httpHandler, this.injector, this.interceptors.concat([interceptor]));
    };
    var HttpService_1;
    HttpService = HttpService_1 = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Optional()), __param(2, core_1.Inject(exports.HTTP_DYNAMIC_INTERCEPTORS)),
        __metadata("design:paramtypes", [http_1.HttpHandler,
            core_1.Injector, Array])
    ], HttpService);
    return HttpService;
}(http_1.HttpClient));
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map