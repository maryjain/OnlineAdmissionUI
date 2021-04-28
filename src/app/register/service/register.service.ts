import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SubSink } from '../../shared/sub-sink';
import { environment } from 'src/environments/environment';
import { Observable, timer } from 'rxjs';
import {Person} from '../../model/Person';
import { map, switchMap } from 'rxjs/operators';
import { Education } from 'src/app/model/Education';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  result : Observable<Person>;
  apiUrl = `${environment.profileapiUrl}`;
  commonapiUrl = `${environment.commonapiUrl}`;
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
    return  this.http.get<any>(this.commonapiUrl +  "otp/send-mail/" + emailid);


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
