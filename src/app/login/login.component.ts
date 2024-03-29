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
import { NotificationService } from '../shared/notification/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UtilityService, LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, public utilitysrv: UtilityService,
              public loginsrv: LoginService, private router: Router, public notifyService: NotificationService) { }

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
    console.log('Inside profileLogin ');
    this.captcha_validation();
   this.person = new Person(null,'','', null,
    this.loginForm.get('emailid').value, null,
    this.loginForm.get('passwordplain').value);

    this.loginsrv.login(this.person).subscribe((res) => {
      console.log('POST login res = ' + res);
      console.log('POST login status= ' + res.data);
      console.log('POST login id= ' + res.id);
      console.log('POST login fullname= ' + res.fullname);
      console.log('POST login status= ' + res.status);
      if(res.data === "true"){
        this.notifyService.showSuccess(" Login Succesfully", "Login");
        sessionStorage.setItem('user', 'user');
        sessionStorage.setItem('profileid', res.id);
        sessionStorage.setItem('fullname', res.fullname);
        sessionStorage.setItem('status', res.status);
        sessionStorage.setItem('loggedIn','true');
        sessionStorage.setItem('finalsubmit','false');
        this.loginsrv.setisloggedIn(true);
        this.router.navigate(['/registrationdetails']);
      }
      else{
       // this.loginsrv.setisloggedIn(false);
       this.notifyService.showError(" Error while Login", "Login");
       sessionStorage.setItem('loggedIn','false');
       sessionStorage.clear();
      }
    },
      (err) => {
        //this.loginsrv.setisloggedIn(false);
        this.notifyService.showError(" Error while Login", "Login");
        sessionStorage.setItem('loggedIn','false');
        sessionStorage.clear();
        if(err.error != null){
        if ((err.error['status'] == 400 || err.error['status'] == 401 || err.error['status'] == 404||err.error['status'] == 402) && err.error['message'] != null && err.error['message'] != undefined ){
        this.errorlist =  err.error['message'];
        let key: string;
        for (let index in this.errorlist){
        if(this.errorlist[index].split(':')[0].split('.')[2] != null && this.errorlist[index].split(':')[0].split('.')[2] != undefined)
          {
            key = this.errorlist[index].split(':')[0].split('.')[2];
          }
          else{
            key = this.errorlist[index].split(':')[0];
          }
        let value: string = this.errorlist[index].split(':')[1];
        this.fieldMapping.set(key, value);
        }
        console.log("err.error['message'][0] = " + key);
        console.log("err.error['status'] = " + err.error['status']);
        }
      }
     });

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

    if (this.captcha !== undefined && this.captcha !== null && this.captcha.trim() !== ""){
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
      console.log(" capcha "+ this.isvalidCaptchaEntered);
      this.captchaStatus = errorMessages.success;

  }else{
      console.log("capcha false");
      this.captchaStatus = errorMessages.failure;
  }
 }
  }

  get emailid() { return this.loginForm.get('emailid'); }
  get passwordplain() { return this.loginForm.get('passwordplain'); }


}
