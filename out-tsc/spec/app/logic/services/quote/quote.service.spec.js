"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/common/http/testing");
var core_1 = require("../../core");
var quote_service_1 = require("./quote.service");
describe('QuoteService', function () {
    var quoteService;
    var httpMock;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [core_1.CoreModule, testing_2.HttpClientTestingModule],
            providers: [core_1.HttpCacheService, quote_service_1.QuoteService]
        });
    }));
    beforeEach(testing_1.inject([core_1.HttpCacheService, quote_service_1.QuoteService, testing_2.HttpTestingController], function (htttpCacheService, _quoteService, _httpMock) {
        quoteService = _quoteService;
        httpMock = _httpMock;
        htttpCacheService.cleanCache();
    }));
    afterEach(function () {
        httpMock.verify();
    });
    describe('getRandomQuote', function () {
        it('should return a random Chuck Norris quote', function () {
            // Arrange
            var mockQuote = { value: 'a random quote' };
            // Act
            var randomQuoteSubscription = quoteService.getRandomQuote({ category: 'toto' });
            // Assert
            randomQuoteSubscription.subscribe(function (quote) {
                expect(quote).toEqual(mockQuote.value);
            });
            httpMock.expectOne({}).flush(mockQuote);
        });
        it('should return a string in case of error', function () {
            // Act
            var randomQuoteSubscription = quoteService.getRandomQuote({ category: 'toto' });
            // Assert
            randomQuoteSubscription.subscribe(function (quote) {
                expect(typeof quote).toEqual('string');
                expect(quote).toContain('Error');
            });
            httpMock.expectOne({}).flush(null, {
                status: 500,
                statusText: 'error'
            });
        });
    });
});
//# sourceMappingURL=quote.service.spec.js.map