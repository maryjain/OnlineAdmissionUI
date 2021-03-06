import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';




@NgModule({
  declarations: [],
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
