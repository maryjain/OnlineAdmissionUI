import { ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent   {
  title = 'ONLINE ADMISSION';
  constructor(private fb: FormBuilder){}



public appForm =this.fb.group({
  state: [''],
  authcode : [''],
},
);


}
