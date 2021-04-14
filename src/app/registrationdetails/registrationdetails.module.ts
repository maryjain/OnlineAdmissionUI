import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationdetailsComponent } from './registrationdetails.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProfiledetailsComponent } from './profiledetails/profiledetails.component';
import { EducationqualificationComponent } from './educationqualification/educationqualification.component';
import { UploaddocumentsComponent } from './uploaddocuments/uploaddocuments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
@NgModule({
  declarations: [RegistrationdetailsComponent, ProfiledetailsComponent, EducationqualificationComponent, UploaddocumentsComponent ],
  imports: [
    CommonModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RegistrationdetailsComponent,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ]
})
export class RegistrationdetailsModule { }
