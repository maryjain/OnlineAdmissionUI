import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import {errorMessages, customregExps, hintPasswordMessages,hintFullNameMessages,hintEmailMessages,hintPhoneMessages} from '../helpers/CustomMessges'
import {ValidationService} from '../shared/validate/validation.service';
import {UtilityService} from '../shared/utility/utility.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[ValidationService, UtilityService],
})
export class RegisterComponent implements OnInit {
  sample: any;
   errors = errorMessages;

  public title = 'Registration';
  public hintPasswordArr = [ hintPasswordMessages.password1,
    hintPasswordMessages.password2,
    hintPasswordMessages.password3,
    hintPasswordMessages.password4,
    hintPasswordMessages.password5,
    hintPasswordMessages.password6 ];
  public hintPasswordDisplay = this.hintPasswordArr.join('\r\n');

  public hintFullNameArr = [ hintFullNameMessages.password1,
    hintFullNameMessages.password2,
    hintFullNameMessages.password3,
    hintFullNameMessages.password4
    ];
  public hintFullNamedDisplay = this.hintFullNameArr.join('\r\n');

  public hintEmailArr = [ hintEmailMessages.password1,
    hintEmailMessages.password2,
    hintEmailMessages.password3,
    hintEmailMessages.password4,
    hintEmailMessages.password5,
  ];
  public hintEmailDisplay = this.hintEmailArr.join('\r\n');

  public hintMobileArr = [ hintPhoneMessages.password1,
    hintPhoneMessages.password2,
    ];
  public hintMobileDisplay = this.hintMobileArr.join('\r\n');


   dobDate: Date;
   minDate: Date;
   maxDate: Date;
   isgenerate: boolean;
   ishide: boolean;
   hide = true;
  public registrationForm =this.fb.group({
    name: ['', [Validators.required,Validators.pattern(customregExps.fullName)]],
    dob :['', Validators.required],
    email : ['', [Validators.required, Validators.pattern(customregExps.email)]],
    mobile: ['', [Validators.required, Validators.pattern(customregExps.mobile)]],
    password: ['', Validators.compose([Validators.required, Validators.pattern(customregExps.password)])],
    otp : ['', Validators.required]
     },
    );


  constructor(private fb: FormBuilder, public validatesrv: ValidationService , public utilitysrv: UtilityService ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date(currentYear - 14, 11, 31);

   // this.registrationForm.controls['dob'].setValue(this.datePipe.transform(this.registrationForm.get('dob').value, 'dd-MM-yyyy'));
  }

  ngOnInit(): void {
    this.isgenerate = true;
    this.ishide = true;
    console.log('hello');

   // this.validatesrv.showTasks();

  }
  onDateChange( $event ) {
    const formatted = $event.value;
    this.sample = moment(this.registrationForm.get('dob').value).format('DD-MM-yyyy');
  }
  onStrengthChange(strength) {
    console.log(strength);
  }



  get name() { return this.registrationForm.get('name'); }
  get dob() { return this.registrationForm.get('dob'); }
  get email() { return this.registrationForm.get('email'); }
  get mobile() { return this.registrationForm.get('mobile'); }
  get password() { return this.registrationForm.get('password'); }
  get otp() { return this.registrationForm.get('otp'); }
  }

