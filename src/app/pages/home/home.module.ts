import {NgModule} from '@angular/core';
import {AboutPage} from '@pages/about/about.page';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';
import {HomePage} from '@pages/home/home.page';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: HomePage}
        ])
    ],
    declarations: [
        HomePage
    ],
    exports: []
})
export class HomeModule {
}
