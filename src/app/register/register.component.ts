import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public title = 'Registration';
  minDate: Date;
  maxDate: Date;
  isgenerate:boolean;
  hide = true;
  registrationForm =new FormGroup({
    name: new FormControl('Test'),
    dob : new FormControl(new Date()),
    age : new FormControl(''),
    email : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    confirmemail : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    mobile : new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    otp : new FormControl(''),
  });
  constructor() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date(currentYear - 14, 11, 31);

  }

  ngOnInit(): void {
    this.isgenerate=true;
  }
  get f() { return this.registrationForm.controls; }
}
