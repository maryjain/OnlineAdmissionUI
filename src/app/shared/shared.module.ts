import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core'

import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';




@NgModule({
  declarations: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [

    FooterModule,
    HeaderModule,
  ],
  exports:
  [
    CommonModule,
    FooterModule,
    HeaderModule,

  ]

})
export class SharedModule { }
