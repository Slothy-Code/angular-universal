"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var routes = {
    quote: function (c) { return "/jokes/random?category=" + c.category; }
};
var QuoteService = /** @class */ (function () {
    function QuoteService(httpClient) {
        this.httpClient = httpClient;
    }
    QuoteService.prototype.getRandomQuote = function (context) {
        return this.httpClient
            .cache()
            .get(routes.quote(context))
            .pipe(operators_1.map(function (body) { return body.value; }), operators_1.catchError(function () { return rxjs_1.of('Error, could not load joke :-('); }));
    };
    QuoteService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], QuoteService);
    return QuoteService;
}());
exports.QuoteService = QuoteService;
//# sourceMappingURL=quote.service.js.map