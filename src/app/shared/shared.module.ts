import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';

import {AppMaterialModule} from '../app-material/app-material.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { MarkAsteriskDirective } from './directive/MarkAsterik/mark-asterisk.directive';
import { AppBlockCopyPasteDirective } from './directive/BlockCopyPaste/app-block-copy-paste.directive';
import { AlphabetOnlyDirective } from './directive/AlphabetOnly/alphabet-only.directive';
import { MoneyOnlyDirective } from './directive/MoneyOnly/money-only.directive';
import {CurrencyPipe} from '@angular/common';



@NgModule({
  declarations: [MarkAsteriskDirective, AppBlockCopyPasteDirective, AlphabetOnlyDirective, MoneyOnlyDirective, ],
  providers: [CurrencyPipe


  ],
  imports: [
    AppMaterialModule,
    FooterModule,
    HeaderModule,

  ],
  exports:
  [
    CommonModule,
    FooterModule,
    HeaderModule,
    AppMaterialModule,
    MarkAsteriskDirective,
    AppBlockCopyPasteDirective,
    AlphabetOnlyDirective,
    MoneyOnlyDirective
  ]

})
export class SharedModule { }
