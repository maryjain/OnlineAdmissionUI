import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import{AppMaterialModule} from '../app-material/app-material.module';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ContentComponent } from './content.component';
import { RegisterhomeComponent } from './registerhome.component';
import {HintdirDirective} from '../commondirective/hintdir.directive';

@NgModule({
  declarations: [RegisterComponent, ContentComponent, RegisterhomeComponent, HintdirDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,

  ],
  exports:[
   RegisterComponent,
   ContentComponent,
   RegisterhomeComponent,
   HintdirDirective,
  ]


})
export class RegisterModule { }
