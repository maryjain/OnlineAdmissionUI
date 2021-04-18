import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UtilityService} from '../../shared/utility/utility.service';
import * as moment from 'moment';
import {CurrencyPipe} from '@angular/common';
import {errorMessages,
   customregExps,
    hintFullNameMessages,
    hintPhoneMessages,hintAnnualIncomeMessages,
    registrationFormMessage} from '../../helpers/CustomMessges';
import { RegistrationdetailsService } from '../service/registrationdetails.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.scss'],
  providers: [UtilityService, RegistrationdetailsService],
})

export class ProfiledetailsComponent  {
  jsonGender = [];
  jsonNationality = [];
  jsonReligion = [];
  jsonCommunity = [];
  jsonState = [];
  isnextButton:boolean;
  isShowCommunity:boolean;
  errors = errorMessages;
  //genderList: Array<any> = [];
  public hintAnnualIncomeMessages = hintAnnualIncomeMessages.annualIncome1;
  public warnmessage = registrationFormMessage.saveWarnMessage;
  public hintFullNameArr = [ hintFullNameMessages.fullname1,
    hintFullNameMessages.fullname2,
    hintFullNameMessages.fullname3,
    hintFullNameMessages.fullname4
    ];
  public hintFullNamedDisplay = this.hintFullNameArr.join('\r\n');
  public hintMobileArr = [ hintPhoneMessages.phone1,
    hintPhoneMessages.phone2,
    ];
  public hintMobileDisplay = this.hintMobileArr.join('\r\n');


  constructor(private fb: FormBuilder, public utilitysrv: UtilityService, public registrationdetailsSrv: RegistrationdetailsService, private currencyPipe: CurrencyPipe) {

   }

  ngOnInit(): void {
    this.isnextButton= false;
    this.isShowCommunity= false;
   this.registrationdetailsSrv.getGender().subscribe((res ) => {
      let json = res;
      for (var type in json) {
        let item = {key:"",value:""};
        item.key = type;
        item.value = json[type];
        this.jsonGender.push(item);
    }
      console.log('this.jsonGender = ' + this.jsonGender);
     },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Gender = "+ err.message);

    });

    this.registrationdetailsSrv.getNationality().subscribe((res ) => {
      let json = res;
      for (var type in json) {
        let item = {key:"",value:""};
        item.key = type;
        item.value = json[type];
        this.jsonNationality.push(item);
    }
      console.log('this.jsonNationality = ' + this.jsonNationality);
     },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Nationality = "+ err.message);
    });


    this.registrationdetailsSrv.getState().subscribe((res ) => {
      let json = res;
      for (var type in json) {
        let item = {key:"",value:""};
        item.key = type;
        item.value = json[type];
        this.jsonState.push(item);
    }
      console.log('this.jsonState = ' + this.jsonState);
     },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured state = "+ err.message);

    });

    this.registrationdetailsSrv.getReligion().subscribe((res ) => {
      let json = res;
      for (var type in json) {
        let item = {key:"",value:""};
        item.key = type;
        item.value = json[type];
        this.jsonReligion.push(item);
    }
      console.log('this.jsonReligion = ' + this.jsonReligion);
     },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Religion = "+ err.message);

    });

  }

  isLinear = true;

  public personalDetailsForm  = this.fb.group({
    fathername: ['', [Validators.required,Validators.pattern(customregExps.fullName)]],
    mothername: ['', [Validators.required,Validators.pattern(customregExps.fullName)]],
    guardianname: ['', [Validators.pattern(customregExps.fullName)]],
    guardianmobileno: ['', [Validators.required, Validators.pattern(customregExps.mobile)]],
    gender: ['', [Validators.required]],
    nationality: ['', [Validators.required]],
    religion: ['', [Validators.required]],
    community: ['', [Validators.required]],
    state: ['', [Validators.required]],
    annualincome:  ['', [Validators.required, Validators.pattern(customregExps.annualincome)]],
    creamylayer:['', [Validators.required]]
  });




  public formPasswordGroup= this.fb.group({
    passWord: ['', Validators.required]
  });
  public formEmailGroup  = this.fb.group({
    emailID: ['', Validators.compose([Validators.required, Validators.email])]
  });
  public formPhoneGroup  = this.fb.group({
    mobile: ['', Validators.compose([Validators.required, Validators.min(10)])]
  });

  public isClickedNext():void{

    console.log(" Annual income =   "+this.personalDetailsForm.get('annualincome').value);
    console.log(" gender=   "+this.personalDetailsForm.get('gender').value);
    if(this.personalDetailsForm.get('gender').value === ""){
      console.log(" gender=   "+this.personalDetailsForm.get('gender').value);
      this.isnextButton= true;
    }else if(this.personalDetailsForm.get('nationality').value === ""){
      console.log(" nationality=   "+this.personalDetailsForm.get('nationality').value);
      this.isnextButton= true;
    }
    else if(this.personalDetailsForm.get('state').value === ""){
      console.log("state=  "+this.personalDetailsForm.get('state').value);
      this.isnextButton= true;
    }
    else if(this.personalDetailsForm.get('religion').value === ""){
      console.log(" religion=   "+this.personalDetailsForm.get('religion').value);
      this.isnextButton= true;
    }

  }


 /* onChangeAnnualIncome(annualIncomeValue)
  {
    this.personalDetailsForm.controls['annualincome'].setValue(this.currencyPipe.transform(annualIncomeValue,'INR'));

  }
  */
  onfocusAnnualIncome()
  {
    this.personalDetailsForm.controls['annualincome'].reset();
  }

 // Community is present for Hindu( 1 ) and Christain( 3 ) as per database value
  public  onChange(religionValue){
    this.isShowCommunity = false;
    console.log(" religionValue= "+religionValue);
    if(religionValue == 1 || religionValue == 3){
    this.isShowCommunity =true;
    this.registrationdetailsSrv.getCommunityByReligion(religionValue).subscribe((res ) => {
      let json = res;
        for (var type in json) {
        if(type === 'communityMaster'){
          this.jsonCommunity=json[type];
          break;
        }
    }
      console.log('this.jsonCommunity = ' + this.jsonCommunity);
     },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured jsonCommunity = "+ err.message);
    });
  }
  }



  get fathername() { return this.personalDetailsForm.get('fathername'); }
  get mothername() { return this.personalDetailsForm.get('mothername'); }
  get guardianname() { return this.personalDetailsForm.get('guardianname'); }
  get guardianmobileno() { return this.personalDetailsForm.get('guardianmobileno'); }
  get gender() { return this.personalDetailsForm.get('gender'); }
  get nationality() { return this.personalDetailsForm.get('nationality'); }
  get religion() { return this.personalDetailsForm.get('religion'); }
  get community() { return this.personalDetailsForm.get('community'); }
  get state() { return this.personalDetailsForm.get('state'); }
  get annualincome() { return this.personalDetailsForm.get('annualincome'); }
  get creamylayer() { return this.personalDetailsForm.get('creamylayer'); }
  get passWord() { return this.formPasswordGroup.get('passWord'); }

 //get passWord() { return this.formPasswordGroup.get('passWord'); }
  //get passWord() { return this.formPasswordGroup.get('passWord'); }
}
