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
import {ProfilesummaryComponent} from './profilesummary/profilesummary.component'
import {ValidationService} from './shared/validate/validation.service';
import {UtilityService} from './shared/utility/utility.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RegisterService } from './register/service/register.service';
import { LoginService } from './login/service/login.service';
import { RegistrationdetailsModule } from './registrationdetails/registrationdetails.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    ProfilesummaryComponent
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
  providers: [ValidationService, UtilityService, RegisterService, LoginService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
],
  bootstrap: [AppComponent],
  entryComponents: [ProfilesummaryComponent]
})
export class AppModule { }
