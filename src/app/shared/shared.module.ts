import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MaterialModule} from '@shared/material.module';
import {LoaderComponent} from '@components/loader/loader.component';
import {TranslateModule} from '@ngx-translate/core';
import {PermissionDirective} from '@logic/directives/permission.directive';

@NgModule({
    imports: [
        TranslateModule.forChild(),
        FlexLayoutModule,
        MaterialModule,
        CommonModule
    ],
    declarations: [
        LoaderComponent,
        PermissionDirective
    ],
    exports: [
        TranslateModule,
        CommonModule,
        LoaderComponent,
        MaterialModule,
        FlexLayoutModule,
        PermissionDirective
    ]
})
export class SharedModule {
}
