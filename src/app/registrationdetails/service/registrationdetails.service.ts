import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/model/Person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationdetailsService {
  profileMasterapiUrl = `${environment.profileMasterapiUrl}`;
  apiUrl = `${environment.profileapiUrl}`;
  public headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');

  constructor(private http: HttpClient) { }

  getGender(): Observable<any>{
    console.log(" this.profileapiUrl ="+this.profileMasterapiUrl);
    return  this.http.get<any>(this.profileMasterapiUrl +  '/gender', {responseType: 'json'});
  }
  getNationality(): Observable<any>{
    console.log(" this.profileapiUrl ="+this.profileMasterapiUrl);
    return  this.http.get<any>(this.profileMasterapiUrl +  '/nationality', {responseType: 'json'});
  }

  getState(): Observable<any>{
    console.log(" this.profileapiUrl ="+this.profileMasterapiUrl);
    return  this.http.get<any>(this.profileMasterapiUrl +  '/state', {responseType: 'json'});
  }

  getReligion(): Observable<any>{
    console.log(" this.profileapiUrl ="+this.profileMasterapiUrl);
    return  this.http.get<any>(this.profileMasterapiUrl +  '/religion', {responseType: 'json'});
  }

  getCommunityByReligion(code): Observable<any>{
    console.log(" this.profileapiUrl ="+this.profileMasterapiUrl);
    return  this.http.get<any>(this.profileMasterapiUrl +  '/religion/'+code+"/community", {responseType: 'json'});
  }


  updatePerson(person: Person): Observable<Person> {
    const body = JSON.stringify(person);
    console.log("Json Body : "+body);
    return this.http.put<Person>(this.apiUrl+'/details/'+person.profileid, body,{'headers': this.headers});

  }
  getProfileByID(profileid: bigint):  Observable<any> {
    return  this.http.get<any>(this.apiUrl + '/' + profileid, {responseType: 'json'});

   }


}
