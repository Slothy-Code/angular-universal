import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '@env/environment';
import {catchError} from 'rxjs/internal/operators';
import {Store} from '@ngrx/store';
import {UserLogout} from '@logic/actions/auth.action';

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private store: Store<{}>) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
    }

    // Customize the default error handler here if needed
    private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
        if (!environment.production) {
            console.error('Request error', response);
        }
        if (response.status === 401 && response.url.includes('/api/user/refresh-token')) {
            this.store.dispatch(new UserLogout());
        }
        throw response;
    }
}
