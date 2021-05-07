import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../../app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { LoginadminComponent } from './loginadmin.component';
import { AdminhomeModule } from '../../adminhome/adminhome.module';


@NgModule({
  declarations: [LoginadminComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    SharedModule,
    AdminhomeModule
  ],
  exports: [
    SharedModule,
   ]
})
export class LoginadminModule { }
