import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departmentuser } from 'src/app/model/Departmentuser';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginadminService {
  constructor(private http: HttpClient) { this.isloggedIn = false; }

  apiUrl = `${environment.adminapiUrl}`;
  //clientUrl = `${environment.clientUrl}`;
  isloggedIn: boolean;
  deptid: number;
  public headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');



 login(user: Departmentuser): Observable<any> {
  this.deptid = 1; // Ayurveda deptid =1
  const body = JSON.stringify(user);
  console.log("Json Body login  : "+body);
  console.log("Json Headers  : "+this.headers);
  return this.http.post<Departmentuser>(this.apiUrl+"/login", body,{'headers': this.headers});
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
