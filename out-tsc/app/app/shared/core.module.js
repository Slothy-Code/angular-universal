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
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LogicModule } from "@logic/logic.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpService } from "@shared/interceptors/http/http.service";
import { CacheInterceptor } from "@shared/interceptors/http/cache.interceptor";
import { ErrorHandlerInterceptor } from "@shared/interceptors/http/error-handler.interceptor";
import { ApiPrefixInterceptor } from "@shared/interceptors/http/api-prefix.interceptor";
import { HttpCacheService } from "@shared/interceptors/http/http-cache.service";
import { I18nService } from "@shared/services/i18n/i18n.service";
import { AuthenticationGuard } from "@shared/guards/authentication/authentication.guard";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BrowserModule } from "@angular/platform-browser";
import { ServiceWorkerModule } from '@angular/service-worker';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { environment } from "@env/environment";
var CoreModule = /** @class */ (function () {
    function CoreModule(parentModule) {
        if (parentModule) {
            throw new Error(parentModule + " has already been loaded. Import Core module in the AppModule only.");
        }
    }
    CoreModule = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
                Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
                LogicModule,
                TranslateModule.forRoot(),
                RouterModule,
                HttpClientModule
            ],
            providers: [
                I18nService,
                HttpCacheService,
                ApiPrefixInterceptor,
                ErrorHandlerInterceptor,
                CacheInterceptor,
                {
                    provide: HttpClient,
                    useClass: HttpService
                }
            ]
        }),
        __param(0, Optional()), __param(0, SkipSelf()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}());
export { CoreModule };
//# sourceMappingURL=core.module.js.map
