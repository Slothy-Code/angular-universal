import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {Title} from '@angular/platform-browser';
import {I18nService} from '@shared/services/i18n/i18n.service';
import {environment} from '@env/environment';
import { filter, map, mergeMap } from 'rxjs/operators';
import {merge} from 'rxjs';
import {AuthenticationService} from '@logic/services/authentication/authentication.service';
import {User} from '@logic/models/user';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private translateService: TranslateService,
              private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.angulartics2GoogleAnalytics.eventTrack(environment.version, { category: 'App initialized' });
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    merge(this.translateService.onLangChange, onNavigationEnd)
        .pipe(
            map(() => {
              let route = this.activatedRoute;
              while (route.firstChild) {
                route = route.firstChild;
              }
              return route;
            }),
            filter(route => route.outlet === 'primary'),
            mergeMap(route => route.data)
        )
        .subscribe(event => {
          const title = event['title'];
          if (title) {
            this.titleService.setTitle(this.translateService.instant(title));
          }
        });
  }
}
