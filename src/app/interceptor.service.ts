import { EventEmitter, Injectable, Component, NgModule } from '@angular/core';
;
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { finalize } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { delay } from 'rxjs/operators';



@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private loadingIndicatorService: SpinnerService) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // emit onStarted event before request execution
    this.loadingIndicatorService.onStarted(req);

    return next
      .handle(req)
      // emit onFinished event after request execution
      .pipe(finalize(() => {
        setTimeout(() =>  this.killTime(), 5000);

        this.loadingIndicatorService.onFinished(req);
        }
      ));
  }
  killTime() {

  }
}
