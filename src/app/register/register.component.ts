import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { interval, Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[ValidationService, UtilityService],
})
export class RegisterComponent implements OnInit , OnDestroy{

  sample: any;
  errors = errorMessages;
  errorlist: string[];
  fieldMapping = new Map();
  person: Person;
  result: Observable<Person>;
  public title = 'Registration';
  dobDate: Date;
  minDate: Date;
  maxDate: Date;
  genearatedOTP: number;
  // OTP
  isGenerateOTP: boolean;
  isConfirmOTP: boolean;
  ishow: boolean;
  hide = true;
  otpStatus: string;
  // Timer
  sub: Subscription;
  countDown;
  count;

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
    emailid : ['', [Validators.required, Validators.pattern(customregExps.email)], this.validatesrv.duplicateEmailidValidator()],
    mobileno: ['', [Validators.required, Validators.pattern(customregExps.mobile)], this.validatesrv.duplicateMobileNoValidator()],
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
    this.isGenerateOTP = true;
    this.isConfirmOTP = false;
    this.ishow = true;
    this.validatesrv.showTasks();
    this.otpStatus = "";
    this.registrationForm.controls['otp'].setValue(0);
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

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
        for (let index in this.errorlist) {
          let key:string = this.errorlist[index].split(':')[0].split('.')[2];
          let value:string = this.errorlist[index].split(':')[1];
          this.fieldMapping.set(key,value);
          }
        console.log("err.error['message'][0] = " + this.errorlist[0].split(':')[0].split('.')[2]);
        console.log("fieldMapping.get('emailid') = " + this.fieldMapping.get('emailid'));
        console.log("fieldMapping.get('mobileno') = " + this.fieldMapping.get('mobileno'));
        console.log("err.error['status'] = " + err.error['status']);
        }
     });
  }


  otpTimer(): void {

    this.count = 11;
    this.countDown = timer(0, 1000)
      .subscribe(x => {
        this.count = this.count - 1;
      });

    this.sub = interval(300)
      .subscribe(x => {
        console.log(this.count);
        if (this.count === 1) {
          this.isConfirmOTP = true;
          this.countDown.unsubscribe();
          console.log("isConfirmOTP = "+this.isConfirmOTP);
          this.sub.unsubscribe();
        }
      });

    }


  clickGenerateOTP(): void
  {
    this.isGenerateOTP = false;
    this.otpTimer();
    this.genearatedOTP= this.registersrv.generateEmailOTP(this.registrationForm.get('emailid').value);
    console.log("OTP generated = "+this.genearatedOTP);

    }


    checkEmailOTP(): void{
      if(this.registrationForm.get('otp').value === this.genearatedOTP && this.count !== 1)
      {
      this.otpStatus = errorMessages.otpSuccess;
      }
      else{
        this.otpStatus = errorMessages.otpFailure;
      }
  }

  clickResendOTP(): void
  {

    this.otpTimer();
    this.genearatedOTP= this.registersrv.generateEmailOTP(this.registrationForm.get('emailid').value);
    console.log("OTP resend = "+this.genearatedOTP);

    }

  get fullname() { return this.registrationForm.get('fullname'); }
  get dob() { return this.registrationForm.get('dob'); }
  get emailid() { return this.registrationForm.get('emailid'); }
  get mobileno() { return this.registrationForm.get('mobileno'); }
  get passwordplain() { return this.registrationForm.get('passwordplain'); }
  get otp() { return this.registrationForm.get('otp'); }





  }

