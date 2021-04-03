import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SubSink } from '../../shared/sub-sink';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {Person} from '../../model/Person';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  result : Observable<Person>;
  apiUrl = `${environment.profileapiUrl}`;
  public headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');

  constructor(private http: HttpClient) { }

  addPerson(person: Person): Observable<Person> {

    const body = JSON.stringify(person);
    console.log("Json Body : "+body);
    return this.http.post<Person>(this.apiUrl, body,{'headers': this.headers});

  }

}
