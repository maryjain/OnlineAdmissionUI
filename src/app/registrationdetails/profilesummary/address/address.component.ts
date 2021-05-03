import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

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
