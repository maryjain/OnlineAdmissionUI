import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ValidationService{

  apiUrl = 'http://localhost/api/students/21000003';
  headers = new HttpHeaders().set('Accept', 'application/json')
  .set('content-type', 'application/json');

  constructor(private http: HttpClient) { }


  // Read
  showTasks(): void {

  this.http.get(this.apiUrl).subscribe((response: Response) => {
    console.log(response);
  });

}
}
