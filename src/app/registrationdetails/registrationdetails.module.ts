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


@NgModule({
  declarations: [RegistrationdetailsComponent, ProfiledetailsComponent, PreviewdetailsComponent  ],
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

  ]
})
export class RegistrationdetailsModule { }
