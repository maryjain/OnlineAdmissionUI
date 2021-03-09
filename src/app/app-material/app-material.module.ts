import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
  ]
})
export class AppMaterialModule { }
