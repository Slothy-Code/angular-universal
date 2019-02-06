import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/internal/operators';
import {AuthenticationService} from '@logic/services/authentication/authentication.service';
import {I18nService} from '@shared/services/i18n/i18n.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '@env/environment';

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
                private authenticationService: AuthenticationService) {
        this.createForm();
    }

    login() {
        this.isLoading = true;
        this.authenticationService
            .login(this.loginForm.value)
            .pipe(
                finalize(() => {
                    this.loginForm.markAsPristine();
                    this.isLoading = false;
                })
            )
            .subscribe(
                credentials => {
                    console.log(credentials.username, 'successfully logged in');
                    this.route.queryParams.subscribe(params =>
                        this.router.navigate([params.redirect || '/home'], { replaceUrl: true })
                    );
                },
                error => {
                    console.log('Login error:', error);
                    this.error = error;
                }
            );
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            remember: true
        });
    }

    ngOnInit(): void {
    }

}
