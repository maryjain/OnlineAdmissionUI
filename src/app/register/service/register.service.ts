import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SubSink } from '../../shared/sub-sink';
import { environment } from 'src/environments/environment';
import { Observable, timer } from 'rxjs';
import {Person} from '../../model/Person';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  result : Observable<Person>;
  apiUrl = `${environment.profileapiUrl}`;
  otpapiUrl = `${environment.commonapiUrl}`;
  otp: string;
  public headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');

  constructor(private http: HttpClient) { }

  addPerson(person: Person): Observable<Person> {

    const body = JSON.stringify(person);
    console.log("Json Body : "+body);
    return this.http.post<Person>(this.apiUrl, body,{'headers': this.headers});

  }

    generateEmailOTP(emailid: string): Observable<any>{
    return  this.http.get<any>(this.otpapiUrl +  "/send-mail/" + emailid);
    /*return timer(1000)
    .pipe(
      switchMap(() => {
        // generate otp
        return this.http.get<any>(this.apiUrl +  "/sensd-mail/"+emailid);
      })
    )
    .pipe(
      map(res => {
        // if otp is present
        if (res != null && res !== undefined) {
          // return error
          console.log("Response = "+res);
          return  res;
        }
      })
    );
    */

 /*   await this.http.get(this.apiUrl + "/send-mail/"+emailid).subscribe((response: string) => {
    this.otp = response;
    console.log('otp : ' + this.otp);
    return this.otp;
  },
  (err: HttpErrorResponse) => {
   if(err.error instanceof Error){
     console.log("Error occured GET Emai OTP");
   }
   return 0;
  }
  );
  }*/
}
}
