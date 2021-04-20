import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSink } from '../sub-sink';
import { environment } from 'src/environments/environment';
import { Person } from 'src/app/model/Person';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ValidationService{
  profileid: string;
  apiUrl = `${environment.profileapiUrl}`;
  headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');
  constructor(private http: HttpClient) { }


  // Read
  showTasks(): void {
    this.http.get(this.apiUrl + "/maxprofileid").subscribe((response: string) => {
    this.profileid = response;
    console.log('profileid : ' + this.profileid);
  },
  (err: HttpErrorResponse) => {
   if(err.error instanceof Error){
     console.log("Error occured GET MaxProfile id");
   }
  }
  );
}


searchEmailid(text) {
  // debounce
  return timer(1000)
    .pipe(
      switchMap(() => {
        // Check if username is available
        return this.http.get<any>(this.apiUrl + '/duplicateEmailid/' + `${text}`);
      })
    );
}

duplicateEmailidValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    return this.searchEmailid(control.value)
      .pipe(
        map(res => {
          // if username is already taken
          if (res === true) {
            // return error
            return { 'EmailidExists': true};
          }
        })
      );
  };
}


searchMobileNo(text) {
  // debounce
  return timer(1000)
    .pipe(
      switchMap(() => {
        // Check if username is available
        return this.http.get<any>(this.apiUrl + '/duplicateMobileNo/' + `${text}`);
      })
    );
}

duplicateMobileNoValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    return this.searchMobileNo(control.value)
      .pipe(
        map(res => {
          // if username is already taken
          if (res === true) {
            // return error
            return { 'MobileNoExists': true};
          }
        })
      );
  };

}

ngOnDestroy(){

}
}
