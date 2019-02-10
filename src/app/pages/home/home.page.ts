import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '@logic/models/user';
import {select, Store} from '@ngrx/store';
import {getCurrentUser} from '@logic/store';
import {Observable} from 'rxjs';
import {UserLogout} from '@logic/actions/auth.action';

@Component({
    selector: 'page-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})

export class HomePage implements OnInit {
    isLoading: boolean;
    private user$: Observable<User>;

    constructor(private router: Router,
                private store: Store<{}>) {
    }

    ngOnInit() {
        this.user$ = this.store.pipe(select(getCurrentUser));

    }

    logout() {
        this.store.dispatch(new UserLogout());
        this.router.navigate(['/login']);
    }

}
