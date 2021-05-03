import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  public personalDetailsForm  = this.fb.group({
    fathername: [''],
    mothername: [''],
    guardianname: [''],
    guardianmobileno: [''],
    gender: [''],
    nationality: [''],
    religion: [''],
    community: [''],
    state: [''],
    annualincome:  [''],
    creamylayer:['']
  });
}
