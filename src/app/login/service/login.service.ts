import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/model/Person';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = `${environment.profileapiUrl}`;
  public headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');
  constructor(private http: HttpClient) { }

 login(person: Person): Observable<any> {
  const body = JSON.stringify(person);
  console.log("Json Body : "+body);
  return this.http.post<Person>(this.apiUrl+"/login", body,{'headers': this.headers});

}
}
