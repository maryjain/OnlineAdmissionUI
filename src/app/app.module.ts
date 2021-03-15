import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import{AppMaterialModule} from './app-material/app-material.module';
import { SharedModule } from './shared/shared.module';

import { HomeModule } from './home/home.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CustomvalidatordirectiveDirective } from './commondirective/customvalidatordirective.directive';



@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    CustomvalidatordirectiveDirective,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    SharedModule,
    HomeModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
