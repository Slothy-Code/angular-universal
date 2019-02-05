var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { I18nService } from "@shared/services/i18n/i18n.service";
import { environment } from "@env/environment";
var LandpagePage = /** @class */ (function () {
    function LandpagePage(i18nService) {
        this.i18nService = i18nService;
        this.version = environment.version;
    }
    LandpagePage.prototype.ngOnInit = function () {
    };
    LandpagePage.prototype.setLanguage = function (language) {
        this.i18nService.language = language;
    };
    Object.defineProperty(LandpagePage.prototype, "currentLanguage", {
        get: function () {
            return this.i18nService.language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LandpagePage.prototype, "languages", {
        get: function () {
            return this.i18nService.supportedLanguages;
        },
        enumerable: true,
        configurable: true
    });
    LandpagePage = __decorate([
        Component({
            selector: 'page-landpage',
            templateUrl: './landpage.page.html',
            styleUrls: ['./landpage.page.scss']
        }),
        __metadata("design:paramtypes", [I18nService])
    ], LandpagePage);
    return LandpagePage;
}());
export { LandpagePage };
//# sourceMappingURL=landpage.page.js.map