import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as Keycloak from 'keycloak-js';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private keycloakAuth: Keycloak.KeycloakInstance;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token=sessionStorage.getItem('accessToken');
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    if(isLoggedIn){
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
         sessionStorage.clear();
        }
        return throwError(response);
      }
    ));

}
}
