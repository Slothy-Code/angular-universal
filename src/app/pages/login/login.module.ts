import {NgModule} from '@angular/core';
import {LoginPage} from '@pages/login/login.page';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: LoginPage}
        ])
    ],
    declarations: [
        LoginPage
    ],
    exports: []
})
export class LoginModule {
}
