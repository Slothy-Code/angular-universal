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
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Angulartics2GoogleAnalytics } from "angulartics2/ga";
import { Title } from "@angular/platform-browser";
import { I18nService } from "@shared/services/i18n/i18n.service";
import { environment } from "@env/environment";
import { filter } from 'rxjs/operators';
var AppComponent = /** @class */ (function () {
    function AppComponent(router, activatedRoute, titleService, translateService, angulartics2GoogleAnalytics, i18nService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.titleService = titleService;
        this.translateService = translateService;
        this.angulartics2GoogleAnalytics = angulartics2GoogleAnalytics;
        this.i18nService = i18nService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.angulartics2GoogleAnalytics.eventTrack(environment.version, { category: 'App initialized' });
        this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
        var onNavigationEnd = this.router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; }));
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            template: "<router-outlet></router-outlet>"
        }),
        __metadata("design:paramtypes", [Router,
            ActivatedRoute,
            Title,
            TranslateService,
            Angulartics2GoogleAnalytics,
            I18nService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map