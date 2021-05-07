import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RegisterModule } from '../register/register.module';
import { LoginModule } from '../login/login.module';
import { LoginadminModule } from '../loginadmin/loginadmin/loginadmin.module';
import { AppRoutingModule } from '../app-routing.module';
import { RegistrationdetailsModule } from '../registrationdetails/registrationdetails.module';
import { AdminhomeModule } from '../adminhome/adminhome.module';
@NgModule({
  declarations: [
    HomeComponent,
    ],
  imports: [
    CommonModule,
    RegisterModule,
    LoginModule,
    LoginadminModule,
    AppRoutingModule,
  ],
  exports:  [
    HomeComponent,
  ]
})
export class HomeModule { }
