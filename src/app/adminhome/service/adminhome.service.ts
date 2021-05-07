import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationStatus } from 'src/app/model/ApplicationStatus';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminhomeService {

  apiUrl = `${environment.adminapiUrl}`;
  public headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');

  constructor(private http: HttpClient) { }

  getApplicationstatus(): Observable<ApplicationStatus[]> {
    console.log(" *************** Applicationstatus ***********");
    return this.http.get<ApplicationStatus[]>(this.apiUrl+"/applicationstatus", {responseType: 'json'});
  }

}
