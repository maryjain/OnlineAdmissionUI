import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import{AppMaterialModule} from '../app-material/app-material.module';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
  ],
  exports:[
   RegisterComponent
  ]


})
export class RegisterModule { }
