import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';
import {getAuthToken} from '@logic/store';
import {first, mergeMap} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private store: Store<{}>) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request);
        return this.store.pipe(
            select(getAuthToken),
            first(),
            mergeMap(token => {
                const authReq = !!token ? request.clone({
                    setHeaders: {Authorization: 'Bearer ' + token.token},
                }) : request;
                return next.handle(authReq);
            })
        );
    }
}
