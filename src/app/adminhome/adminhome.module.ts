import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { AdminhomeComponent } from './adminhome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReviewapplicationsComponent } from './reviewapplications/reviewapplications.component';
import { HomepageComponent } from './homepage/homepage.component';


@NgModule({
  declarations: [AdminhomeComponent, ReviewapplicationsComponent, HomepageComponent],
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
    AdminhomeComponent,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule,
  ]
})
export class AdminhomeModule { }
