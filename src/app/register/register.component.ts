import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import {errorMessages,
   customregExps,
    hintPasswordMessages,
    hintFullNameMessages,
    hintEmailMessages,
    hintPhoneMessages,
    registrationFormMessage} from '../helpers/CustomMessges'
import {ValidationService} from '../shared/validate/validation.service';
import {UtilityService} from '../shared/utility/utility.service';
import {RegisterService} from './service/register.service';
import {Person} from '../model/Person';
import { Observable, Subscription, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[ValidationService, UtilityService],
})
export class RegisterComponent implements OnInit {
  sample: any;
  errors = errorMessages;
  errorlist: string;
  person: Person;
  result: Observable<Person>;
  public title = 'Registration';
  dobDate: Date;
  minDate: Date;
  maxDate: Date;
  isgenerate: boolean;
  ishide: boolean;
  hide = true;
  public warnmessage = registrationFormMessage.saveWarnMessage;
  public hintPasswordArr = [ hintPasswordMessages.password1,
    hintPasswordMessages.password2,
    hintPasswordMessages.password3,
    hintPasswordMessages.password4,
    hintPasswordMessages.password5,
    hintPasswordMessages.password6 ];
  public hintPasswordDisplay = this.hintPasswordArr.join('\r\n');

  public hintFullNameArr = [ hintFullNameMessages.fullname1,
    hintFullNameMessages.fullname2,
    hintFullNameMessages.fullname3,
    hintFullNameMessages.fullname4
    ];
  public hintFullNamedDisplay = this.hintFullNameArr.join('\r\n');

  public hintEmailArr = [ hintEmailMessages.email1,
    hintEmailMessages.email2,
    hintEmailMessages.email3,
    hintEmailMessages.email4,
    hintEmailMessages.email5,
  ];
  public hintEmailDisplay = this.hintEmailArr.join('\r\n');

  public hintMobileArr = [ hintPhoneMessages.phone1,
    hintPhoneMessages.phone2,
    ];
  public hintMobileDisplay = this.hintMobileArr.join('\r\n');


  public registrationForm =this.fb.group({
    fullname: ['', [Validators.required,Validators.pattern(customregExps.fullName)]],
    dob : ['', Validators.required],
    emailid : ['', [Validators.required, Validators.pattern(customregExps.email)]],
    mobileno: ['', [Validators.required, Validators.pattern(customregExps.mobile)]],
    passwordplain: ['', Validators.compose([Validators.required, Validators.pattern(customregExps.password)])],
    otp : ['', Validators.required]
     },
    );


  constructor(private fb: FormBuilder, public validatesrv: ValidationService, public utilitysrv: UtilityService,
    public registersrv: RegisterService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date(currentYear - 14, 11, 31);

   // this.registrationForm.controls['dob'].setValue(this.datePipe.transform(this.registrationForm.get('dob').value, 'dd-MM-yyyy'));
  }

  ngOnInit(): void {
    this.isgenerate = true;
    this.ishide = true;
    this.validatesrv.showTasks();

    this.registrationForm.controls['otp'].setValue(0);
  }
  onDateChange( $event ) {
    const formatted = $event.value;
    this.sample = moment(this.registrationForm.get('dob').value).format('DD-MM-yyyy');
  }
  onStrengthChange(strength) {
    console.log(strength);
  }

  addPerson() {
    this.person = new Person(
    this.registrationForm.get('fullname').value,
    this.registrationForm.get('dob').value,
    this.registrationForm.get('emailid').value,
    this.registrationForm.get('mobileno').value,
    this.registrationForm.get('passwordplain').value);

    this.registersrv.addPerson(this.person).subscribe((data) => {
      console.log('POST profileid= ' + data.profileid);
      this.person.profileid = data.profileid;
     // this.validatesrv.getlatestProfile(this.person);
    },
      (err) => {
        if(err.error['status'] == 400 && err.error['message'] != null && err.error['message'] != undefined ){
        this.errorlist =  err.error['message'];
        console.log("err.error['message'][0] =" + this.errorlist[0]);
        console.log("err.error['message'] length =" + this.errorlist.length);
        console.log("err.error['status'] =" + err.error['status']);
        }
     });
  }

  get fullname() { return this.registrationForm.get('fullname'); }
  get dob() { return this.registrationForm.get('dob'); }
  get emailid() { return this.registrationForm.get('emailid'); }
  get mobileno() { return this.registrationForm.get('mobileno'); }
  get passwordplain() { return this.registrationForm.get('passwordplain'); }
  get otp() { return this.registrationForm.get('otp'); }

  }

