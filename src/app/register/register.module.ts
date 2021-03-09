import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import{AppMaterialModule} from '../app-material/app-material.module';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ContentComponent } from './content.component';
@NgModule({
  declarations: [RegisterComponent, ContentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule,
  ],
  exports:[
   RegisterComponent,
   ContentComponent
  ]


})
export class RegisterModule { }
