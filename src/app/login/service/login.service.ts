import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/model/Person';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { this.isloggedIn = false; }

  apiUrl = `${environment.profileapiUrl}`;
  isloggedIn: boolean;
  public headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');


 login(person: Person): Observable<any> {
  const body = JSON.stringify(person);
  console.log("Json Body login  : "+body);
  console.log("Json Headers  : "+this.headers);
  return this.http.post<Person>(this.apiUrl+"/login", body,{'headers': this.headers});
}

setisloggedIn(value: boolean): void
{
  this.isloggedIn = value;
}

getisloggedIn( ): boolean
{
  return this.isloggedIn;
}
}
