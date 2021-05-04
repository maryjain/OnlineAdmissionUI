import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationdetailsComponent } from './registrationdetails.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProfiledetailsComponent } from './profiledetails/profiledetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PreviewdetailsComponent } from './previewdetails/previewdetails.component';
import {ProfilesummaryComponent} from './profilesummary/profilesummary.component';
import { PersonalComponent } from './profilesummary/personal/personal.component';
import { AddressComponent } from './profilesummary/address/address.component';
import { EducationqualificationComponent } from './profilesummary/educationqualification/educationqualification.component';
import { PaymentComponent } from './profilesummary/payment/payment.component';

@NgModule({
  declarations: [RegistrationdetailsComponent, ProfiledetailsComponent, PreviewdetailsComponent,ProfilesummaryComponent, PersonalComponent, AddressComponent, EducationqualificationComponent, PaymentComponent  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,

  ],
  exports: [
    RegistrationdetailsComponent,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule,
    ProfiledetailsComponent,
    PreviewdetailsComponent,
    ProfilesummaryComponent,
  ]
})
export class RegistrationdetailsModule {


 }
