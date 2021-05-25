import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material/app-material.module';
import { SharedModule } from './shared/shared.module';

import { HomeModule } from './home/home.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import {ValidationService} from './shared/validate/validation.service';
import {UtilityService} from './shared/utility/utility.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RegisterService } from './register/service/register.service';
import { LoginService } from './login/service/login.service';
import { RegistrationdetailsModule } from './registrationdetails/registrationdetails.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ToastrModule } from 'ngx-toastr';
import { SessionstorageService } from './shared/session/sessionstorage.service';
import { PreviewdetailsComponent } from './previewdetails/previewdetails.component';
import { AddresspreviewComponent } from './previewdetails/addresspreview/addresspreview.component';
import { PersonalpreviewComponent } from './previewdetails/personalpreview/personalpreview.component';
import { EducationpreviewComponent } from './previewdetails/educationpreview/educationpreview.component';
import { PaymentpreviewComponent } from './previewdetails/paymentpreview/paymentpreview.component';
import { DocumentspreviewComponent } from './previewdetails/documentspreview/documentspreview.component';
import { SpinnerService } from './spinner.service';
import { InterceptorService } from './interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './AuthGuard';


@NgModule({
  declarations: [
    AppComponent,
    PreviewdetailsComponent,
    PagenotfoundComponent,
    PersonalpreviewComponent,
    AddresspreviewComponent,
    EducationpreviewComponent,
    PaymentpreviewComponent,
    DocumentspreviewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    RegistrationdetailsModule,
    PdfViewerModule,
    ToastrModule.forRoot(),

  ],
  providers: [AuthGuard, ValidationService, UtilityService, RegisterService, LoginService, SessionstorageService, SpinnerService, {
    provide: HTTP_INTERCEPTORS,
    useFactory: (service: SpinnerService) => new InterceptorService(service),
    multi: true,
    deps: [SpinnerService]
  }, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
],
  bootstrap: [AppComponent],
  entryComponents: [
    PreviewdetailsComponent
  ],
 /// entryComponents: [ProfilesummaryComponent]
})
export class AppModule { }
