import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubSink } from '../sub-sink';
import { environment } from 'src/environments/environment';
import { Person } from 'src/app/model/Person';
@Injectable({
  providedIn: 'root'
})
export class ValidationService{
  profileid: string;
  apiUrl = `${environment.profileapiUrl}`;
  headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');
 // private subscriptions = new SubSink();
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
getlatestProfile(person: Person): void {

 this.http.get(this.apiUrl +'/'+ person.profileid).subscribe((response: Response) => {
    console.log(response);
  },
    (err: HttpErrorResponse) => {
    if ( err.error instanceof Error){
      console.log("Error occured GET Profile id");
    }
   });
}

ngOnDestroy(){

}
}
