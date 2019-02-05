import {NgModule} from '@angular/core';
import {LandpagePage} from "@pages/landpage/landpage.page";
import {RouterModule} from "@angular/router";
import {SharedModule} from "@shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        TranslateModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: LandpagePage}
        ])
    ],
    declarations: [
        LandpagePage
    ],
    exports: []
})
export class LandpageModule {
}
