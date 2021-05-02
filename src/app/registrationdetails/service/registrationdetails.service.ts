import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/Address';
import { Education } from 'src/app/model/Education';
import { Payment } from 'src/app/model/Payment';
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

  getDistrictByState(code): Observable<any>{
    console.log(" this.profileapiUrl ="+this.profileMasterapiUrl);
    return  this.http.get<any>(this.profileMasterapiUrl +  '/state/'+code+"/district", {responseType: 'json'});
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

  addAddress(address: Address): Observable<Address> {
    const body = JSON.stringify(address);
    console.log("Json Body : "+body);
    return this.http.post<Address>(this.apiUrl+'/'+address.profileid+'/addresses', body,{'headers': this.headers});

  }

  addEducation(education: Education): Observable<Education> {
    const body = JSON.stringify(education);
    console.log("Json Body education : "+body);
    return this.http.post<Education>(this.apiUrl+'/'+education.profileid+'/educationqualifications', body,{'headers': this.headers});
  }

  addPayment(payment: Payment): Observable<Payment> {
    const body = JSON.stringify(payment);
    console.log("Json Body payment : "+body);
    return this.http.post<Payment>(this.apiUrl+'/payment/'+payment.profileid, body,{'headers': this.headers});
  }


  getProfileByID(profileid: bigint):  Observable<any> {
    return  this.http.get<any>(this.apiUrl + '/' + profileid, {responseType: 'json'});

   }


}
