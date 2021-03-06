import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import{AppMaterialModule} from '../../app-material/app-material.module';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports:
  [
    FooterComponent

  ]
})
export class FooterModule { }
