import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationdetailsService {
  profileMasterapiUrl = `${environment.profileMasterapiUrl}`;
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
}
