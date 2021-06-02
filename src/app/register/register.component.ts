import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import {errorMessages,
   customregExps,
    hintPasswordMessages,
    hintFullNameMessages,
    hintEmailMessages,
    hintPhoneMessages,
    registrationFormMessage} from '../helpers/CustomMessges';
import {ValidationService} from '../shared/validate/validation.service';
import {UtilityService} from '../shared/utility/utility.service';
import {RegisterService} from '../register/service/register.service';
import {Person} from '../model/Person';
import { interval, Observable, Subscription, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[ValidationService, UtilityService,RegisterService],
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
  genearatedOTP: any;
  // OTP
  isGenerateOTP: boolean;
  isConfirmOTP: boolean;
  isResendOTP: boolean;
  isshowEmailOTP: boolean;  // not used
  errorEmailOTP: string;
  isshowErrorEmailOTP: boolean;
  isvalidOTPEntered: boolean;
  hide = true;
  otpStatus: string;
  //captcha
  captchaStatus: string;
  captcha:string;
  inputCaptcha: number;
  isvalidCaptchaEntered: boolean;
  // Timer
  sub: Subscription;
  countDown;
  count: number;

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
   // fullname: ['', [Validators.required,Validators.pattern(customregExps.fullName)]],
    fullname: [''],
    dob : ['', Validators.required],
    emailid : [''],
    //emailid : ['', [Validators.required, Validators.pattern(customregExps.email)], this.validatesrv.duplicateEmailidValidator()],
    mobileno: ['', [Validators.required, Validators.pattern(customregExps.mobile)], this.validatesrv.duplicateMobileNoValidator()],
   // passwordplain: ['', Validators.compose([Validators.required, Validators.pattern(customregExps.password)])],
    otp : ['', Validators.required],
   // enteredCaptcha: ['', Validators.required]
     },
    );


  constructor(private fb: FormBuilder, public validatesrv: ValidationService, public utilitysrv: UtilityService,
              public registersrv: RegisterService, private router: Router, public notifyService: NotificationService,) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date(currentYear - 14, 11, 31);

   // this.registrationForm.controls['dob'].setValue(this.datePipe.transform(this.registrationForm.get('dob').value, 'dd-MM-yyyy'));
  }

  ngOnInit(): void {
    this.registrationForm.reset();
    console.log("%%%%%%%%%%%%%%%    Name : "+sessionStorage.getItem('name'));
    console.log("%%%%%%%%%%%%%%%%  Email : "+sessionStorage.getItem('email'));
    this.registrationForm.controls['fullname'].setValue(sessionStorage.getItem('name'));
    this.registrationForm.controls['emailid'].setValue(sessionStorage.getItem('email'));
    this.onBlurEmail();
    this.isvalidOTPEntered = false;
    this.isvalidCaptchaEntered = false;
    this.isGenerateOTP = true;
    this.isConfirmOTP = false;
    this.isResendOTP = false;
    this.isshowEmailOTP = true; // not used
    this.isshowErrorEmailOTP = false;
    this.errorEmailOTP = "";
    this.validatesrv.showTasks();
    this.otpStatus = "";
    this.registrationForm.controls['otp'].setValue(0);
    this.captchaStatus = "";

  }

  ngOnDestroy() {
    if(this.sub != null && this.sub !== undefined)
    {
      this.sub.unsubscribe();
    }
    }

  onDateChange( $event ) {
    const formatted = $event.value;
    this.sample = moment(this.registrationForm.get('dob').value).format('DD-MM-yyyy');
  }
  onStrengthChange(strength) {
    console.log(strength);
  }

  onBlurEmail()
  {
    if (this.registrationForm.get('emailid').valid){
      this.errorEmailOTP= "";
      this.isshowErrorEmailOTP = false;
    }
  }


  addPerson() {
    /*
    this.captcha_validation();
    this.person = new Person(
    this.registrationForm.get('fullname').value,
    this.registrationForm.get('dob').value,
    this.registrationForm.get('emailid').value,
    this.registrationForm.get('mobileno').value,
    this.registrationForm.get('passwordplain').value);
   */
  this.person = new Person(
    this.registrationForm.get('fullname').value,
    this.registrationForm.get('dob').value,
    this.registrationForm.get('emailid').value,
    this.registrationForm.get('mobileno').value,
    null);

    this.registersrv.addPerson(this.person).subscribe((data) => {
      this.notifyService.showSuccess(" Added Succesfully", "Registration");
      console.log('POST profileid= ' + data.profileid);
      this.person.profileid = data.profileid;
      sessionStorage.setItem('profileid', data.profileid.toString());
      console.log('session profileid= ' + sessionStorage.getItem('profileid'));
     // this.validatesrv.getlatestProfile(this.person);
   //  this.router.navigate(['/login']);
    },
      (err) => {
        this.notifyService.showError(" Error in  Registration", "Registration");
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

    this.count = 121;
    this.countDown = timer(0, 1000)
      .subscribe(x => {
        this.count = this.count - 1;
      });

    this.sub = interval(300)
      .subscribe(x => {
        console.log(this.count);
        if (this.count === 1) {
          this.isConfirmOTP = true;
          this.isResendOTP = true;
          this.countDown.unsubscribe();
          console.log('isConfirmOTP = '+ this.isConfirmOTP);
          this.sub.unsubscribe();
        }
      });

    }

  clickGenerateOTP( $event)
  {

    this.otpStatus = "";
    $event.preventDefault();
    if(this.registrationForm.get('emailid').valid){
    this.isshowErrorEmailOTP = false;
    this.errorEmailOTP = "";
    this.isGenerateOTP = false;
    this.isConfirmOTP = true;
    this.otpTimer();
    this.registersrv.generateEmailOTP(this.registrationForm.get('emailid').value).subscribe((data => {
      this.genearatedOTP = data;
      this.notifyService.showSuccess(" OTP  Generated", "Registration");
      console.log('this.genearatedOTP = ' + this.genearatedOTP);
     }));
    }
    else{
      this.isConfirmOTP = false;
      if(this.registrationForm.get('emailid').hasError('required'))
      {
       this.errorEmailOTP = this.errors.emailRequired;
      }
      if(this.registrationForm.get('emailid').hasError('pattern'))
      {
       this.errorEmailOTP = this.errors.email;
      }
      if(this.registrationForm.get('emailid').hasError('emailDuplicate'))
      {
       this.errorEmailOTP = this.errors.emailDuplicate;
      }
      this.isshowErrorEmailOTP = true;
    }
    }


    checkEmailOTP($event): void{
      this.isvalidOTPEntered = false;
      this.otpStatus = "";
      $event.preventDefault();
      console.log("parseInt(this.registrationForm.get('otp').value, 10) =" +parseInt(this.registrationForm.get('otp').value, 10));
      console.log("this.count =" +this.count);
      console.log("OTP generated = "+this.genearatedOTP);
      if (parseInt(this.registrationForm.get('otp').value, 10) === parseInt(this.genearatedOTP, 10) && this.count !== 1)
      {
        this.isvalidOTPEntered = true;
        console.log("check otp , this.genearatedOTP = "+this.genearatedOTP);
        console.log("check otp , input value = "+this.registrationForm.get('otp').value);
        this.countDown.unsubscribe();
        this.sub.unsubscribe();
      this.otpStatus = errorMessages.success;
      this.isConfirmOTP =false;
      this.isResendOTP = false;
      }
      else{
        this.countDown.unsubscribe();
        this.sub.unsubscribe();
        this.isResendOTP = true;
        this.isConfirmOTP = false;
        this.otpStatus = errorMessages.failure;
      }
  }

  generateCaptcha(): void
  {
    this.isvalidCaptchaEntered= false;
    this.captchaStatus= "";
    this.captcha="";
    this.utilitysrv.generateCaptcha().subscribe((res ) => {
      this.captcha = res.data;
      console.log('this.captcha = ' + this.captcha);
     },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Captcha = "+ err.message);

    });
    this.registrationForm.get('enteredCaptcha').setValue('');
  }

  captcha_validation():void
  {
    this.isvalidCaptchaEntered= false;
    this.captchaStatus= "";
    if(this.captcha !==""){
    let arr = this.captcha.split(' ');
    this.inputCaptcha = parseInt(this.registrationForm.get('enteredCaptcha').value, 10);
    let ans = 0;
    switch(arr[1]){
      case '+' :  ans=parseInt(arr[0])+parseInt(arr[2]);break;
      case '-' :  ans=parseInt(arr[0])-parseInt(arr[2]);break;
      case '*' :  ans=parseInt(arr[0])*parseInt(arr[2]);break;
    }
    console.log(arr);
    console.log(" answer = "+ans);

    if(this.inputCaptcha === ans){
      this.isvalidCaptchaEntered= true;
      console.log("true");
      this.captchaStatus= errorMessages.success;

  }else{
      console.log("false");
      this.captchaStatus= errorMessages.failure;
  }
 }
  }


  get fullname() { return this.registrationForm.get('fullname'); }
  get dob() { return this.registrationForm.get('dob'); }
  get emailid() { return this.registrationForm.get('emailid'); }
  get mobileno() { return this.registrationForm.get('mobileno'); }
  get passwordplain() { return this.registrationForm.get('passwordplain'); }
  get otp() { return this.registrationForm.get('otp'); }
  get enteredCaptcha() { return this.registrationForm.get('enteredCaptcha'); }
  }

