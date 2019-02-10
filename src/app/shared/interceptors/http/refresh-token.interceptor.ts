import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';
import {getAuthToken} from '@logic/store';
import {first, mergeMap} from 'rxjs/operators';
import {Token} from '@logic/models/token';
import {environment} from '@env/environment';
import {UserRefreshToken} from '@logic/actions/auth.action';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    constructor(private store: Store<{}>) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.pipe(
            select(getAuthToken),
            first(),
            mergeMap((token: Token) => {
                if (!token || request.url.includes('refresh-token') || request.url.includes('login')) {
                    return next.handle(request);
                }

                const timeDifference = environment.jwtExpirationTime / 6;
                const currentTime = (new Date()).getTime() / 1000;
                if (currentTime + timeDifference >= token.exp) {
                    this.store.dispatch(new UserRefreshToken());
                }
                return next.handle(request);
            })
        );
    }
}
