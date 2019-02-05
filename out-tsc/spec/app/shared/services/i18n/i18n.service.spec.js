"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@ngx-translate/core");
var rxjs_1 = require("rxjs");
var i18n_service_1 = require("./i18n.service");
var defaultLanguage = 'en-US';
var supportedLanguages = ['eo', 'en-US', 'fr-FR'];
var MockTranslateService = /** @class */ (function () {
    function MockTranslateService() {
        this.onLangChange = new rxjs_1.Subject();
    }
    MockTranslateService.prototype.use = function (language) {
        this.currentLang = language;
        this.onLangChange.next({
            lang: this.currentLang,
            translations: {}
        });
    };
    MockTranslateService.prototype.getBrowserCultureLang = function () {
        return 'en-US';
    };
    MockTranslateService.prototype.setTranslation = function (lang, translations, shouldMerge) { };
    return MockTranslateService;
}());
describe('I18nService', function () {
    var i18nService;
    var translateService;
    var onLangChangeSpy;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [i18n_service_1.I18nService, { provide: core_1.TranslateService, useClass: MockTranslateService }]
        });
    });
    beforeEach(testing_1.inject([i18n_service_1.I18nService, core_1.TranslateService], function (_i18nService, _translateService) {
        i18nService = _i18nService;
        translateService = _translateService;
        // Create spies
        onLangChangeSpy = jasmine.createSpy('onLangChangeSpy');
        translateService.onLangChange.subscribe(function (event) {
            onLangChangeSpy(event.lang);
        });
        spyOn(translateService, 'use').and.callThrough();
    }));
    afterEach(function () {
        // Cleanup
        localStorage.removeItem('language');
    });
    describe('extract', function () {
        it('should not modify string', function () {
            expect(i18n_service_1.extract('Hello world !')).toEqual('Hello world !');
        });
    });
    describe('init', function () {
        it('should init with default language', function () {
            // Act
            i18nService.init(defaultLanguage, supportedLanguages);
            // Assert
            expect(translateService.use).toHaveBeenCalledWith(defaultLanguage);
            expect(onLangChangeSpy).toHaveBeenCalledWith(defaultLanguage);
        });
        it('should init with save language', function () {
            // Arrange
            var savedLanguage = 'eo';
            localStorage.setItem('language', savedLanguage);
            // Act
            i18nService.init(defaultLanguage, supportedLanguages);
            // Assert
            expect(translateService.use).toHaveBeenCalledWith(savedLanguage);
            expect(onLangChangeSpy).toHaveBeenCalledWith(savedLanguage);
        });
    });
    describe('set language', function () {
        it('should change current language', function () {
            // Arrange
            var newLanguage = 'eo';
            i18nService.init(defaultLanguage, supportedLanguages);
            // Act
            i18nService.language = newLanguage;
            // Assert
            expect(translateService.use).toHaveBeenCalledWith(newLanguage);
            expect(onLangChangeSpy).toHaveBeenCalledWith(newLanguage);
        });
        it('should change current language without a region match', function () {
            // Arrange
            var newLanguage = 'fr-CA';
            i18nService.init(defaultLanguage, supportedLanguages);
            // Act
            i18nService.language = newLanguage;
            // Assert
            expect(translateService.use).toHaveBeenCalledWith('fr-FR');
            expect(onLangChangeSpy).toHaveBeenCalledWith('fr-FR');
        });
        it('should change current language to default if unsupported', function () {
            // Arrange
            var newLanguage = 'es';
            i18nService.init(defaultLanguage, supportedLanguages);
            // Act
            i18nService.language = newLanguage;
            // Assert
            expect(translateService.use).toHaveBeenCalledWith(defaultLanguage);
            expect(onLangChangeSpy).toHaveBeenCalledWith(defaultLanguage);
        });
    });
    describe('get language', function () {
        it('should return current language', function () {
            // Arrange
            i18nService.init(defaultLanguage, supportedLanguages);
            // Act
            var currentLanguage = i18nService.language;
            // Assert
            expect(currentLanguage).toEqual(defaultLanguage);
        });
    });
});
//# sourceMappingURL=i18n.service.spec.js.map