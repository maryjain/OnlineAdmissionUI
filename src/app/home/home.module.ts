import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RegisterModule } from '../register/register.module';
import { LoginModule } from '../login/login.module';


import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    ],
  imports: [
    CommonModule,
    RegisterModule,
    LoginModule,
    AppRoutingModule,
  ],
  exports:  [
    HomeComponent,
  ]
})
export class HomeModule { }
