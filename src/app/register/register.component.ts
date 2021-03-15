import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {errorMessages,customregExps,hintMessages} from '../helpers/CustomMessges'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   errors = errorMessages;

  public title = 'Registration';
  public hintmessage=hintMessages.password;
   minDate: Date;
   maxDate: Date;
   isgenerate:boolean;
   hide = true;
  public registrationForm =this.fb.group({
    name: ['',[Validators.required,Validators.pattern(customregExps.fullName)]],
    dob :['',Validators.required],
    email : ['',[Validators.required,Validators.pattern(customregExps.email)]],
    mobile: ['',[Validators.required,Validators.pattern(customregExps.mobile)]],
    password: ['',Validators.compose([Validators.required,Validators.pattern(customregExps.password)])],
    otp : ['',Validators.required]
    });
  constructor(private fb : FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date(currentYear - 14, 11, 31);

  }

  ngOnInit(): void {
    this.isgenerate=true;
  }
  get f() { return this.registrationForm.controls; }

  get name() { return this.registrationForm.get('name'); }
  get dob() { return this.registrationForm.get('dob'); }
  get email() { return this.registrationForm.get('email'); }
  get mobile() { return this.registrationForm.get('mobile'); }
  get password() { return this.registrationForm.get('password'); }
  get otp() { return this.registrationForm.get('otp'); }
  }

