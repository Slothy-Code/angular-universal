import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getAuthToken} from '@logic/store';
import {first, map} from 'rxjs/operators';


@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router, private store: Store<{}>) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            select(getAuthToken),
            first(),
            map((token) => {
                if (token.token) {
                    return true;
                }
                this.router.navigate(['/login'], {queryParams: {redirect: state.url}, replaceUrl: true});
                return false;
            })
        );
    }
}
