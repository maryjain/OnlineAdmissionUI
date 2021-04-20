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
import { Person } from 'src/app/model/Person';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.scss'],
  providers: [UtilityService, RegistrationdetailsService],
})

export class ProfiledetailsComponent  {
  profileID: any;
  person: Person;
  errorlist: string[];
  jsonGender = [];
  jsonNationality = [];
  jsonReligion = [];
  jsonCommunity = [];
  jsonState = [];
  isnextButton:boolean;
  isShowCommunity:boolean;
  errors = errorMessages;
  religionText: string;
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


  constructor(private fb: FormBuilder, public utilitysrv: UtilityService,
    public registrationdetailsSrv: RegistrationdetailsService, private currencyPipe: CurrencyPipe, public router: Router) {

   }

  ngOnInit(): void {
    this.person = new Person('', null, '', null, '');
    this.religionText="";
    this.profileID = 2100000004;
    this.isnextButton = false;
    this.isShowCommunity = false;
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


   /* this.registrationdetailsSrv.getProfileByID(this.profileID).subscribe((res ) => {
      let json = res;
    this.person = new Person(json['fullname'],json['dob'],json['emailid'],json['mobileno'],"");
      console.log('this.Person full name= ' + this.person.fullname);
     },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured profile = "+ err.message);

    });
    */

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

  updatePerson() {

    this.person.fathername= this.personalDetailsForm.get('fathername').value;
    this.person.mothername= this.personalDetailsForm.get('mothername').value;
    this.person.guardianname= this.personalDetailsForm.get('guardianname').value;
    this.person.guardianmobileno= this.personalDetailsForm.get('guardianmobileno').value;
    this.person.gender= this.personalDetailsForm.get('gender').value;
    this.person.nationality= this.personalDetailsForm.get('nationality').value;
    this.person.state= this.personalDetailsForm.get('state').value;
    this.person.religion= this.religionText;
    this.person.community= this.personalDetailsForm.get('community').value;
    this.person.annualincome= this.personalDetailsForm.get('annualincome').value;
    this.person.creamylayer= this.personalDetailsForm.get('creamylayer').value;


    this.person.profileid=this.profileID;
    this.registrationdetailsSrv.updatePerson(this.person).subscribe((data) => {
      console.log('PUT profileid= ' + data.profileid);
     // this.validatesrv.getlatestProfile(this.person);
     this.router.navigate(['/login']);
    },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured update personal details = "+ err.message);

    });
  }



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
    this.isnextButton= false;
    console.log(" Annual income =   "+this.personalDetailsForm.get('annualincome').value);
    console.log(" creamylayer=   "+this.personalDetailsForm.get('creamylayer').value);
    console.log(" gender=   "+this.personalDetailsForm.get('gender').value);
    console.log(" nationality=   "+this.personalDetailsForm.get('nationality').value);
    console.log("state=  "+this.personalDetailsForm.get('state').value);
    console.log(" religion ***=   "+this.religionText);

    if(this.personalDetailsForm.get('gender').value === ""){

      this.isnextButton= true;
    }

    if(this.personalDetailsForm.get('nationality').value === ""){

      this.isnextButton= true;
    }

    if(this.personalDetailsForm.get('state').value === ""){

      this.isnextButton= true;
    }

    if(this.personalDetailsForm.get('religion').value === ""){

      this.isnextButton= true;
    }

    if(this.personalDetailsForm.get('annualincome').value === ""){

      this.isnextButton= true;
    }

    if(this.personalDetailsForm.get('creamylayer').value === ""){

      this.isnextButton= true;
    }
    if(this.isnextButton === false)
    {
      this.updatePerson();
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
  public  onChange($event){
    this.isShowCommunity = false;
    let religionValue=$event.target.value;
    this.religionText=$event.target.options[$event.target.options.selectedIndex].text;
    console.log(" religionValue= "+$event.target.value);
    console.log(" religionText= "+this.religionText);
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
