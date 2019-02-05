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
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
            .pipe(map(function (body) { return body.value; }), catchError(function () { return of('Error, could not load joke :-('); }));
    };
    QuoteService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], QuoteService);
    return QuoteService;
}());
export { QuoteService };
//# sourceMappingURL=quote.service.js.map