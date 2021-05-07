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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PreviewdetailsComponent } from './previewdetails/previewdetails.component';
import { AddresspreviewComponent } from './previewdetails/addresspreview/addresspreview.component';
import { PersonalpreviewComponent } from './previewdetails/personalpreview/personalpreview.component';
import { EducationpreviewComponent } from './previewdetails/educationpreview/educationpreview.component';
import { PaymentpreviewComponent } from './previewdetails/paymentpreview/paymentpreview.component';
import { AdminhomeModule } from './adminhome/adminhome.module';
import { LoginadminComponent } from './loginadmin/loginadmin/loginadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewdetailsComponent,
    PagenotfoundComponent,
    PersonalpreviewComponent,
    AddresspreviewComponent,
    EducationpreviewComponent,
    PaymentpreviewComponent,
    LoginadminComponent
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
    AdminhomeModule,
  ],
  providers: [ValidationService, UtilityService, RegisterService, LoginService, SessionstorageService,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
],
  bootstrap: [AppComponent],
  entryComponents: [
    PreviewdetailsComponent
  ],
 /// entryComponents: [ProfilesummaryComponent]
})
export class AppModule { }
