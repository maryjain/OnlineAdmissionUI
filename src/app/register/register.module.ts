import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentComponent } from './content.component';
import { RegisterhomeComponent } from './registerhome.component';
import { SharedModule } from '../shared/shared.module';
import { PasswordStrengthMeterComponent} from './password-strength-meter/password-strength-meter.component';


@NgModule({
  declarations: [RegisterComponent, ContentComponent, RegisterhomeComponent, PasswordStrengthMeterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    SharedModule,
  ],
  exports: [
   RegisterComponent,
   ContentComponent,
   RegisterhomeComponent,
   SharedModule,
   PasswordStrengthMeterComponent,

  ]


})
export class RegisterModule { }
