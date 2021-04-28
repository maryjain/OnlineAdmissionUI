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
import { AngularFileUploaderComponent } from './AngularFileUploader/angular-file-uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule, PdfViewerComponent } from 'ng2-pdf-viewer';
import { PercentageDirective } from './directive/Percentage/percentage.directive';
import { CGPADirective } from './directive/CGPA/cgpa.directive';


@NgModule({
  declarations: [MarkAsteriskDirective, AppBlockCopyPasteDirective, AlphabetOnlyDirective, MoneyOnlyDirective,
    AngularFileUploaderComponent,
    PercentageDirective,
    CGPADirective
    ],
  providers: [CurrencyPipe,PdfViewerComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppMaterialModule,
    FooterModule,
    HeaderModule,
    PdfViewerModule
  ],
  exports:
  [
    CommonModule,
    HttpClientModule,
    FooterModule,
    HeaderModule,
    AppMaterialModule,
    MarkAsteriskDirective,
    AppBlockCopyPasteDirective,
    AlphabetOnlyDirective,
    MoneyOnlyDirective,
    PercentageDirective,
    CGPADirective,
    AngularFileUploaderComponent,
    PdfViewerModule,

  ]

})
export class SharedModule { }
