import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import{AppMaterialModule} from '../../app-material/app-material.module';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    AppMaterialModule
  ],
  exports:
  [
    HeaderComponent

  ]
})
export class HeaderModule { }
