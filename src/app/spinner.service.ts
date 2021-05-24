import { EventEmitter, Injectable, Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class SpinnerService{
onLoadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

/**
 * Stores all currently active requests
 */
private requests: HttpRequest<any>[] = [];

/**
 * Adds request to the storage and notifies observers
 */
onStarted(req: HttpRequest<any>): void {
  console.log(" ++++++++++%%%%%%%+++++ ******* onStarted");
  this.requests.push(req);
  this.notify();
}


/**
 * Removes request from the storage and notifies observers
 */
onFinished(req: HttpRequest<any>): void {
  console.log(" ++++++++++%%%%%%%+++++ ******* onFinished");

  const index = this.requests.indexOf(req);
  if (index !== -1) {
    this.requests.splice(index, 1);
  }
  this.notify();
}

/**
 * Notifies observers about whether there are any requests on fly
 */
private notify(): void {
  console.log(" ++++++++++%%%%%%%+++++ ******* notify");
  this.onLoadingChanged.emit(this.requests.length !== 0);
}

}
