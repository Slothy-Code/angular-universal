import {NgModule} from '@angular/core';
import {AboutPage} from '@pages/about/about.page';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: AboutPage}
        ])
    ],
    declarations: [
        AboutPage
    ],
    exports: []
})
export class AboutModule {
}
