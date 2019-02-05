import {Component, OnInit} from '@angular/core';
import {I18nService} from "@shared/services/i18n/i18n.service";
import {environment} from "@env/environment";

@Component({
    selector: 'page-landpage',
    templateUrl: './landpage.page.html',
    styleUrls: ['./landpage.page.scss']
})

export class LandpagePage implements OnInit {
    version: string = environment.version;

    constructor(private i18nService: I18nService) {
    }

    ngOnInit(): void {
    }

    setLanguage(language: string) {
        this.i18nService.language = language;
    }

    get currentLanguage(): string {
        return this.i18nService.language;
    }

    get languages(): string[] {
        return this.i18nService.supportedLanguages;
    }

}
