import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UtilityService} from '../../shared/utility/utility.service';
import * as moment from 'moment';
import {CurrencyPipe} from '@angular/common';
import {errorMessages,
   customregExps,
    hintFullNameMessages, hintAddressMessages,
    hintPhoneMessages, hintAnnualIncomeMessages,
    registrationFormMessage} from '../../helpers/CustomMessges';
import { RegistrationdetailsService } from '../service/registrationdetails.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Person } from 'src/app/model/Person';
import { Router } from '@angular/router';

import { AngularFileUploaderConfig } from '../../shared/AngularFileUploader/angular-file-uploader.types';
import { MatRadioChange } from '@angular/material/radio';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.scss'],
  providers: [UtilityService, RegistrationdetailsService],
})

export class ProfiledetailsComponent  {
//******    variable  declaration ******
  isLinear = true;  // for mat-tepper navigation property
  addresstype = {present:'Present Address',permanent:'Permanent Address'};
  logintUserProfileId :any;
  apiUrl = `${environment.profileapiUrl}`;
  //profileID: any;
  person: Person;
  errorlist: string[];
  jsonGender = [];
  jsonNationality = [];
  jsonReligion = [];
  jsonCommunity = [];
  jsonState = [];
  jsonDistrict=[];
  stateTextSelected:any;
  isnextButton:boolean;
  isnextAddressButton:boolean;
  isShowCommunity:boolean;
  errors = errorMessages;
  religionText: string;
  isEWSvisible:boolean;
  public hintAdressArr =[ hintAddressMessages.addressline1,
    hintAddressMessages.addressline2,
    hintAddressMessages.addressline3
   ];
   public hintAddressdMessages = this.hintAdressArr.join('\r\n');
  public hintAnnualIncomeMessages = hintAnnualIncomeMessages.annualIncome1;
  public warnmessage = registrationFormMessage.saveWarnMessage;
  public hintFullNameArr = [ hintFullNameMessages.fullname1,
    hintFullNameMessages.fullname2,
    hintFullNameMessages.fullname3,
    hintFullNameMessages.fullname4,
    ];
  public hintFullNamedDisplay = this.hintFullNameArr.join('\r\n');
  public hintMobileArr = [ hintPhoneMessages.phone1,
    hintPhoneMessages.phone2,
    ];
  public hintMobileDisplay = this.hintMobileArr.join('\r\n');

// File upload start
// variable used in shared/angular-file-uploader.component
  resetUpload1: boolean;
  resetUpload2: boolean;
  resetUpload3: boolean;

  fileuploadConfig: AngularFileUploaderConfig = {
    id: 112233,
    multiple: false,
    maxSize: 204800,
    formatsAllowed: '.jpg,.jpeg,.pdf',
    uploadAPI: {
      url: this.apiUrl+'/upload/',
    }
  };

// File upload end


  constructor(private fb: FormBuilder, public utilitysrv: UtilityService,
    public registrationdetailsSrv: RegistrationdetailsService, private currencyPipe: CurrencyPipe, public router: Router) {

   }

   //******   ngOnInit declaration start ******
  ngOnInit(): void {
    this.personalDetailsForm.controls['annualincome'].setValue(1);
    this.isEWSvisible=false;
    this.person = new Person('', null, '', null, '');

    this.religionText="";
    this.logintUserProfileId = 2100000004;
    this.fileuploadConfig.uploadAPI.url+=this.logintUserProfileId;
    console.log("______*****______this.fileuploadConfig.uploadAPI.url ="+this.fileuploadConfig.uploadAPI.url);
    this.isnextButton = false;
    this.isnextAddressButton = false;
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


       //******   ngOnInit declaration ends ******

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

//******    Forms declaration ******

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

  public addressDetailsForm  = this.fb.group({
    permanent_addressline1: ['', [Validators.required,Validators.pattern(customregExps.addressline)]],
    permanent_addressline2: ['', [Validators.required,Validators.pattern(customregExps.addressline)]],
   // permanent_addresstype: ['', [Validators.required]],
    permanent_pincode: ['', [Validators.required, Validators.pattern(customregExps.pincode)]],
    permanent_districtcode: ['', [Validators.required]],
    present_addressline1: ['', [Validators.required,Validators.pattern(customregExps.addressline)]],
    present_addressline2: ['', [Validators.required,Validators.pattern(customregExps.addressline)]],
  //  present_addresstype: ['', [Validators.required]],
    present_pincode: ['', [Validators.required, Validators.pattern(customregExps.pincode)]],
    present_districtcode: ['', [Validators.required]],
    addresscheckbox:['']
  });



  updatePerson() {
    this.person.fathername= this.personalDetailsForm.get('fathername').value;
    this.person.mothername= this.personalDetailsForm.get('mothername').value;
    this.person.guardianname= this.personalDetailsForm.get('guardianname').value;
    this.person.guardianmobileno= this.personalDetailsForm.get('guardianmobileno').value;
    this.person.gender= this.personalDetailsForm.get('gender').value;
    this.person.nationality= this.personalDetailsForm.get('nationality').value;
    this.person.state= this.stateTextSelected;
    this.person.religion= this.religionText;
    if(this.personalDetailsForm.get('community').value === "")
    {
      this.person.community='N/A';
    }
    else
    {
    this.person.community= this.personalDetailsForm.get('community').value;
    }
    this.person.annualincome= this.personalDetailsForm.get('annualincome').value;
    this.person.creamylayer= this.personalDetailsForm.get('creamylayer').value;
    this.person.profileid=this.logintUserProfileId;
    this.registrationdetailsSrv.updatePerson(this.person).subscribe((data) => {
      console.log('PUT profileid= ' + data.profileid);
     // this.validatesrv.getlatestProfile(this.person);
     //this.router.navigate(['/login']);
    },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured update personal details = "+ err.message);

    });
  }
//******    Forms declaration  ends ******


  public formPasswordGroup= this.fb.group({
    passWord: ['', Validators.required]
  });
  public formEmailGroup  = this.fb.group({
    emailID: ['', Validators.compose([Validators.required, Validators.email])]
  });
  public formPhoneGroup  = this.fb.group({
    mobile: ['', Validators.compose([Validators.required, Validators.min(10)])]
  });

//******    Events method declaration ******

public isClickedAddressNext():void
{


}

  // first personal details Next button click
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
    if(this.personalDetailsForm.get('creamylayer').value === ""){

      this.isnextButton= true;
    }
    if(this.isnextButton === false)
    {
      this.updatePerson();
      // Kerala statecode =1
     this.registrationdetailsSrv.getDistrictByState(this.personalDetailsForm.get('state').value).subscribe((res ) => {
      let json = res;
      for (var type in json) {
        let item = {key:"",value:""};
        item.key = type;
        item.value = json[type];
        this.jsonDistrict.push(item);
    }
      console.log('this.jsonDistrict = ' + this.jsonDistrict);
     },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured district = "+ err.message);
    });
    }

  }
//******    Trim Text value for start and end spaces declaration ******
  onChangeTrim($event):void
  {
    $event.target.value=$event.target.value.trim();
  }
 /* onChangeAnnualIncome(annualIncomeValue)
  {
    this.personalDetailsForm.controls['annualincome'].setValue(this.currencyPipe.transform(annualIncomeValue,'INR'));

  }
  */

  public onChangeAddressCheckBox():void
  {
    if(this.addressDetailsForm.get('addresscheckbox').value === true){
      this.addressDetailsForm.controls['permanent_addressline1'].setValue(this.addressDetailsForm.get('present_addressline1').value);
      this.addressDetailsForm.controls['permanent_addressline2'].setValue(this.addressDetailsForm.get('present_addressline2').value);
      //this.addressDetailsForm.controls['permanent_addresstype'].setValue(this.addressDetailsForm.get('present_addresstype').value);
      this.addressDetailsForm.controls['permanent_districtcode'].setValue(this.addressDetailsForm.get('present_districtcode').value);
      this.addressDetailsForm.controls['permanent_pincode'].setValue(this.addressDetailsForm.get('present_pincode').value);
    }
    else{
      this.addressDetailsForm.reset();
    }
  }

 public onChangeCreamyLayer(mrChange: MatRadioChange):void
 {
  console.log(" *** creamy ="+mrChange.value);
  if(mrChange.value === 'true')
  {
    this.isEWSvisible = false;
  }
  else if(mrChange.value === 'false'){
    this.isEWSvisible =true;
  }

 console.log(" this.isEWSvisible "+this.isEWSvisible);

 }
  onfocusAnnualIncome()
  {
    this.personalDetailsForm.controls['annualincome'].reset();
  }


  onChangeState($event):void
  {
    this.stateTextSelected = $event.target.options[$event.target.options.selectedIndex].text;
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

//******    Formcontrol access from HTML declaration ******

// personal details
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

  //Present Address  details
  get present_addressline1() { return this.addressDetailsForm.get('present_addressline1'); }
  get present_addressline2() { return this.addressDetailsForm.get('present_addressline2'); }
  get present_addresstype() { return this.addressDetailsForm.get('present_addresstype'); }
  get present_districtcode() { return this.addressDetailsForm.get('present_districtcode'); }
  get present_pincode() { return this.addressDetailsForm.get('present_pincode'); }

  //Permanent Address  details
  get permanent_addressline1() { return this.addressDetailsForm.get('permanent_addressline1'); }
  get permanent_addressline2() { return this.addressDetailsForm.get('permanent_addressline2'); }
  get permanent_addresstype() { return this.addressDetailsForm.get('permanent_addresstype'); }
  get permanent_districtcode() { return this.addressDetailsForm.get('permanent_districtcode'); }
  get permanent_pincode() { return this.addressDetailsForm.get('permanent_pincode'); }




  //******    Upload Documents REST api call status ******
  docUpload(event) {
    console.log('ApiResponse -> docUpload -> Event: ',event);
  }



}
