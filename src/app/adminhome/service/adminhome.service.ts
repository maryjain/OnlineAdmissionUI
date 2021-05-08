import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationStatus } from 'src/app/model/ApplicationStatus';
import { Person } from 'src/app/model/Person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminhomeService {

  apiUrl = `${environment.adminapiUrl}`;
  profileapiUrl = `${environment.profileapiUrl}`;
  public headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');

  constructor(private http: HttpClient) { }

  getApplicationstatus(): Observable<ApplicationStatus[]> {
    console.log(" *************** Applicationstatus ***********");
    return this.http.get<ApplicationStatus[]>(this.apiUrl+"/applicationstatus", {responseType: 'json'});
  }

  getAllApplications(): Observable<Person[]> {
    console.log(" *************** Get all Applications ***********");
    return this.http.get<Person[]>(this.profileapiUrl, {responseType: 'json'});
  }


  updatePersonReivew(person: Person): Observable<Person> {
    const body = JSON.stringify(person);
    console.log("Json Body : "+body);
    return this.http.put<Person>(this.apiUrl+'/applicationreview/'+person.profileid, body,{'headers': this.headers});
  }

}
