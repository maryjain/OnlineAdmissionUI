import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import{AppMaterialModule} from '../app-material/app-material.module';
import { RegisterComponent } from './register.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ContentComponent } from './content.component';
import { RegisterhomeComponent } from './registerhome.component';
@NgModule({
  declarations: [RegisterComponent, ContentComponent, RegisterhomeComponent],
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
  ]


})
export class RegisterModule { }
