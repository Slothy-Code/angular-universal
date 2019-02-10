import {NgModule, Optional, SkipSelf} from '@angular/core';
import {LogicModule} from '@logic/logic.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpService} from '@shared/interceptors/http/http.service';
import {CacheInterceptor} from '@shared/interceptors/http/cache.interceptor';
import {ErrorHandlerInterceptor} from '@shared/interceptors/http/error-handler.interceptor';
import {ApiPrefixInterceptor} from '@shared/interceptors/http/api-prefix.interceptor';
import {HttpCacheService} from '@shared/interceptors/http/http-cache.service';
import {I18nService} from '@shared/services/i18n/i18n.service';
import {AuthenticationGuard} from '@shared/guards/authentication/authentication.guard';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {environment} from '@env/environment';
import {RouteReusableStrategy} from '@shared/services/route-reusable-strategy';
import {PermissionGuard} from '@shared/guards/permission/permission.guard';
import {JwtInterceptor} from '@shared/interceptors/http/jwt.incerceptor';
import {RefreshTokenInterceptor} from '@shared/interceptors/http/refresh-token.interceptor';

@NgModule({
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
      AuthenticationGuard,
      PermissionGuard.guards,
      I18nService,
      HttpCacheService,
      ApiPrefixInterceptor,
      ErrorHandlerInterceptor,
      CacheInterceptor,
      {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},

      {
          provide: HttpClient,
          useClass: HttpService
      },
      {
          provide: RouteReuseStrategy,
          useClass: RouteReusableStrategy
      }
  ]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
        }
    }
}

