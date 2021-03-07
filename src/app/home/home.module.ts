import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RegisterModule } from '../register/register.module';
import { LoginModule } from '../login/login.module';
import { FlexLayoutModule } from '@angular/flex-layout'
import{AppMaterialModule} from '../app-material/app-material.module';

@NgModule({
  declarations: [
    HomeComponent,
    ],
  imports: [
    CommonModule,
    AppMaterialModule,
    RegisterModule,
    LoginModule,
    FlexLayoutModule,

  ],
  exports:  [
    HomeComponent,

  ]
})
export class HomeModule { }
