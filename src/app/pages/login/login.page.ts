import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {I18nService} from '@shared/services/i18n/i18n.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '@env/environment';
import {Store} from '@ngrx/store';
import {UserLogin} from '@logic/actions/auth.action';

@Component({
    selector: 'page-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
    version: string = environment.version;
    error: string;
    loginForm: FormGroup;
    isLoading = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private i18nService: I18nService,
                private store: Store<{}>) {
        this.createForm();
    }

    login() {
        this.isLoading = true;
        this.store.dispatch(new UserLogin(this.loginForm.value));
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            remember: true
        });
    }

    ngOnInit(): void {
    }

}
