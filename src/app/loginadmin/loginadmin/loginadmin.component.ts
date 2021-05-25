import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { customregExps, errorMessages, hintFullNameMessages, hintPasswordMessages } from 'src/app/helpers/CustomMessges';
import { Departmentuser } from 'src/app/model/Departmentuser';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { UtilityService } from 'src/app/shared/utility/utility.service';
import { LoginadminService } from '../service/loginadmin.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.scss'],
  providers: [UtilityService, LoginadminService]
})
export class LoginadminComponent implements OnInit {

  constructor(private fb: FormBuilder, public utilitysrv: UtilityService,
    public loginsrv: LoginadminService, private router: Router,public notifyService : NotificationService) { }

sample: any;
errors = errorMessages;
errorlist: string[];
fieldMapping = new Map();
user: Departmentuser;
result: Observable<Departmentuser>;
public title = 'Admin Login';
hide = true;
//captcha
captchaStatus: string;
captcha: string;
inputCaptcha: number;
isvalidCaptchaEntered: boolean;

public loginForm = this.fb.group({
deptusername : ['', [Validators.required, Validators.pattern(customregExps.userName)]],
passwordplain: ['', Validators.compose([Validators.required, Validators.pattern(customregExps.password)])],
enteredCaptcha: ['', Validators.required]
},
);

ngOnInit(): void {
this.isvalidCaptchaEntered = false;

}


profileLogin() {
console.log('Inside admin Login ');
this.captcha_validation();
this.user = new Departmentuser(
this.loginForm.get('deptusername').value, this.loginForm.get('passwordplain').value);

this.loginsrv.login(this.user).subscribe((res) => {
console.log('POST login admin res = ' + res);
console.log('POST login admin status= ' + res.data);
console.log('POST login admin id= ' + res.id);
console.log('POST login deptusername= ' + res.deptusername);
if(res.data === "true"){
this.notifyService.showSuccess(res.deptusername+" Login Succesfully", "Admin Login");
sessionStorage.setItem('user', 'admin');
sessionStorage.setItem('deptuserid', res.id);
sessionStorage.setItem('deptusername', res.deptusername);
sessionStorage.setItem('deptname', res.deptname);
sessionStorage.setItem('loggedIn','true');
this.loginsrv.setisloggedIn(true);
this.router.navigate(['/adminhome/homepage']);
}
else{
// this.loginsrv.setisloggedIn(false);
this.notifyService.showError(" Error while Admin Login", "Admin Login");
sessionStorage.setItem('loggedIn','false');
sessionStorage.clear();
}
},
(err) => {
//this.loginsrv.setisloggedIn(false);
this.notifyService.showError(" Error while Admin Login", "Admin Login");
sessionStorage.setItem('loggedIn','false');
sessionStorage.clear();
if (err.error['status'] == 400 && err.error['message'] != null && err.error['message'] != undefined ){
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

get deptusername() { return this.loginForm.get('deptusername'); }
get passwordplain() { return this.loginForm.get('passwordplain'); }


}
