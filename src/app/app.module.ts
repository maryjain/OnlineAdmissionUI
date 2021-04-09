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
@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,

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

  ],
  providers: [ValidationService, UtilityService, RegisterService, LoginService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
