import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as Keycloak from 'keycloak-js';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) { }
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
        if (response.status === 401 || response.status === 400 || response.status === 403 ) {
           let headers = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
           console.log("----+++++++----- refresh token "+sessionStorage.getItem('refreshToken'));
           let body=JSON.stringify({
              "client_id": "profileclientapp",
              "refresh_token":  sessionStorage.getItem('refreshToken'),
              "redirect_uri": "http://localhost:4200/authcodereader"
            });

            this.http.post<any>('http://localhost:8180/auth/realms/Profile/protocol/openid-connect/logout', body,{'headers': headers})
            .subscribe((data) => {
              console.log("----+++++++----- Keycloak user logout success ");
            sessionStorage.clear();
            },
            (err: HttpErrorResponse) => {
              console.log("Error status = "+ err.statusText);
              console.log("Error occured = "+ err.message);
            });

        }
        return throwError(response);
      }
    ));

}
}
