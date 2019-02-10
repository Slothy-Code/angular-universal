import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {Title} from '@angular/platform-browser';
import {I18nService} from '@shared/services/i18n/i18n.service';
import {environment} from '@env/environment';
import {filter, map, mergeMap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {User} from '@logic/models/user';
import {Store} from '@ngrx/store';
import {UserRestoreSession} from '@logic/actions/auth.action';
import {Token} from '@logic/models/token';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    currentUser: User;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private titleService: Title,
                private translateService: TranslateService,
                private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
                private i18nService: I18nService,
                private store: Store<{}>) {
        const token = JSON.parse(localStorage.getItem('currentUser')) as Token;
        if (token) this.store.dispatch(new UserRestoreSession(token));
    }

    ngOnInit() {
        this.angulartics2GoogleAnalytics.eventTrack(environment.version, {category: 'App initialized'});
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
