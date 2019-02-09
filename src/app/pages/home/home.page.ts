import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@logic/services/authentication/authentication.service';
import {Router} from '@angular/router';
import {User} from '@logic/models/user';

@Component({
    selector: 'page-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})

export class HomePage implements OnInit {
    currentUser: User;
    isLoading: boolean;

    constructor(private router: Router,
                private authenticationService: AuthenticationService) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {

    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}
