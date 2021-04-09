import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import {errorMessages, hintPasswordMessages, hintEmailMessages, customregExps} from '../helpers/CustomMessges';
import {Person} from '../model/Person';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from '../shared/utility/utility.service';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, public utilitysrv: UtilityService, public loginsrv: LoginService) { }

  sample: any;
  errors = errorMessages;
  errorlist: string[];
  fieldMapping = new Map();
  person: Person;
  result: Observable<Person>;
  public title = 'Login';
  hide = true;
 //captcha
 captchaStatus: string;
 captcha: string;
 inputCaptcha: number;
 isvalidCaptchaEntered: boolean;

 public hintPasswordArr = [ hintPasswordMessages.password1,
  hintPasswordMessages.password2,
  hintPasswordMessages.password3,
  hintPasswordMessages.password4,
  hintPasswordMessages.password5,
  hintPasswordMessages.password6 ];
public hintPasswordDisplay = this.hintPasswordArr.join('\r\n');

public hintEmailArr = [ hintEmailMessages.email1,
    hintEmailMessages.email2,
    hintEmailMessages.email3,
    hintEmailMessages.email4,
    hintEmailMessages.email5,
  ];
  public hintEmailDisplay = this.hintEmailArr.join('\r\n');

  public loginForm = this.fb.group({
    emailid : ['', [Validators.required, Validators.pattern(customregExps.email)]],
    passwordplain: ['', Validators.compose([Validators.required, Validators.pattern(customregExps.password)])],
    enteredCaptcha: ['', Validators.required]
     },
    );

  ngOnInit(): void {
    this.isvalidCaptchaEntered = false;
  }


  profileLogin() {
    this.captcha_validation();
    this.person = new Person('', null,
    this.loginForm.get('emailid').value, null,
    this.loginForm.get('passwordplain').value);

   /* this.loginsrv.login(this.person).subscribe((data) => {
      console.log('POST profileid= ' + data.profileid);
      this.person.profileid = data.profileid;
     // this.validatesrv.getlatestProfile(this.person);
     this.router.navigate(['/register']);

    },
      (err) => {
        if (err.error['status'] == 400 && err.error['message'] != null && err.error['message'] != undefined ){
        this.errorlist =  err.error['message'];
        for (let index in this.errorlist) {
        let key: string = this.errorlist[index].split(':')[0].split('.')[2];
        let value: string = this.errorlist[index].split(':')[1];
        this.fieldMapping.set(key, value);
        }
        console.log("err.error['message'][0] = " + this.errorlist[0].split(':')[0].split('.')[2]);
        console.log("fieldMapping.get('emailid') = " + this.fieldMapping.get('emailid'));
        console.log("fieldMapping.get('mobileno') = " + this.fieldMapping.get('mobileno'));
        console.log("err.error['status'] = " + err.error['status']);
        }
     });
     */
  }




  generateCaptcha(): void
  {
    this.isvalidCaptchaEntered = false;
    this.captchaStatus = "";
    this.captcha = "";
    this.utilitysrv.generateCaptcha().subscribe((res ) => {
      this.captcha = res.data;
      console.log('this.captcha = ' + this.captcha);
     },
    (err: HttpErrorResponse) => {
      console.log("Error status = " + err.statusText);
     console.log("Error occured Captcha = " + err.message);

    });
    this.loginForm.get('enteredCaptcha').setValue('');
  }

  captcha_validation(): void
  {
    this.isvalidCaptchaEntered = false;
    this.captchaStatus = "";
    if (this.captcha !== ""){
    let arr = this.captcha.split(' ');
    this.inputCaptcha = parseInt(this.loginForm.get('enteredCaptcha').value, 10);
    let ans = 0;
    switch (arr[1]){
      case '+' :  ans = parseInt(arr[0]) + parseInt(arr[2]); break;
      case '-' :  ans = parseInt(arr[0]) - parseInt(arr[2]); break;
      case '*' :  ans = parseInt(arr[0]) * parseInt(arr[2]); break;
    }
    console.log(arr);
    console.log(" answer = " + ans);

    if (this.inputCaptcha === ans){
      this.isvalidCaptchaEntered = true;
      console.log("true");
      this.captchaStatus = errorMessages.success;

  }else{
      console.log("false");
      this.captchaStatus = errorMessages.failure;
  }
 }
  }

  get emailid() { return this.loginForm.get('emailid'); }
  get passwordplain() { return this.loginForm.get('passwordplain'); }


}
