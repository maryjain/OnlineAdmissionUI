import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  commonapiUrl = `${environment.commonapiUrl}`;
  constructor(private http: HttpClient) { }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
   }

   generateCaptcha(): Observable<any>{
    console.log(" this.commonapiUrl ="+this.commonapiUrl);
    return  this.http.get<any>(this.commonapiUrl +  'captcha', {responseType: 'json'});
  }
}
