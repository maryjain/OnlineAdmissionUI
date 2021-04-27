import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { MatStepper } from '@angular/material/stepper';
import { ViewChild } from '@angular/core';
import { Address } from 'src/app/model/Address';
import { MatTableDataSource } from '@angular/material/table';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';


export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};



export interface EDUCATION {
  qualificationtype: string;
  institution: string;
  university: string;
  yearofpass: number;
  registrationno: string;
  cgpa: number;
  percentage: number;

}
const ELEMENT_DATA: EDUCATION[] = [
  { qualificationtype: "10th", institution: '', university: 'CBSE', yearofpass: 2005, registrationno: "M900000",cgpa:4.0,percentage:0 },
  { qualificationtype: "12th", institution: '', university: 'THSE', yearofpass: 2007, registrationno: "RT565000",cgpa:0,percentage:80 },
];

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.scss'],
  providers: [UtilityService, RegistrationdetailsService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ProfiledetailsComponent  {
  displayedColumns = ['qualificationtype', 'institution', 'university', 'yearofpass', 'registrationno','cgpa','percentage'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

//******    variable  declaration ******
  isLinear = false;  // for mat-tepper navigation property

  addresstype = {present:'Present Address',permanent:'Permanent Address'};
  logintUserProfileId :any;
  apiUrl = `${environment.profileapiUrl}`;
  //profileID: any;
  minDate : Date;
  passYear:any;
  person: Person;
  present_address: Address;
  permanent_address: Address;
  errorlist: string[];
  jsonGender = [];
  jsonNationality = [];
  jsonReligion = [];
  jsonCommunity = [];
  jsonState = [];
  jsonDistrict= [];
  jsonQualification= [{key:1,value:'10th'},{key:2,value:'12th'},{key:3,value:'Degree'},{key:4,value:'PG'},{key:5,value:'PHD'},{key:6,value:'Certification'},{key:7,value:'Others'}];
  stateTextSelected:any;
  isnextPersonalButton:boolean;
  isnextAddressButton:boolean;
  isSelectOptionPersonalInvalid: boolean;
  isSelectOptionAddressInvalid: boolean;
  isShowCommunity:boolean;
  errors = errorMessages;
  religionText: string;
  isEWSvisible:boolean;
  onChange = (year: Date) => { };
  onTouched = () => { };
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

    this.formEducationDetailsGroup.controls['yearofpass']=new FormControl(moment());
    console.log(" jsonQualification =" +this.jsonQualification);
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 1);

    this.addressDetailsForm.get('addresscheckbox').setValue(false);
    this.personalDetailsForm.controls['annualincome'].setValue(1);
    this.personalDetailsForm.controls['community'].setValue('N/A');
    this.isEWSvisible=false;
    this.isnextPersonalButton = false;
    this.isnextAddressButton = false;
    this.isShowCommunity = false;
    this.isSelectOptionPersonalInvalid= false;
    this.isSelectOptionAddressInvalid= false;
    // create object to be pass as json in rest api PUT,POST call

    this.person = new Person('', null, '', null, '');
    this.present_address = new Address('', '', '', null,null,false,null);
    this.permanent_address = new Address('', '', '', null,null,false,null);

    this.religionText="";
    this.logintUserProfileId = 2100000004;
    this.fileuploadConfig.uploadAPI.url+=this.logintUserProfileId;
    console.log("______*****______this.fileuploadConfig.uploadAPI.url ="+this.fileuploadConfig.uploadAPI.url);


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

  public formEducationDetailsGroup= this.fb.group({
    qualificationtype: ['', [Validators.required]],
    institution: ['', [Validators.required,Validators.pattern(customregExps.fullName)]],
    university: ['', [Validators.required,Validators.pattern(customregExps.fullName)]],
    yearofpass: ['', [Validators.required,Validators.pattern(customregExps.yearofpass)]],
    registrationno: ['', [Validators.required,Validators.pattern(customregExps.registrationno)]],
    cgpa: ['', [Validators.required,Validators.pattern(customregExps.cgpa)]],
    percentage: ['', [Validators.required,Validators.pattern(customregExps.percentage)]],
  });



//******    Forms declaration  ends ******

  public formEmailGroup  = this.fb.group({
    emailID: ['', Validators.compose([Validators.required, Validators.email])]
  });
  public formPhoneGroup  = this.fb.group({
    mobile: ['', Validators.compose([Validators.required, Validators.min(10)])]
  });

//******    Events method declaration ******


addAddress()
{
  this.present_address = new Address('', '', '', null,null,false,null);
  this.present_address.addressline1= this.addressDetailsForm.get('present_addressline1').value;
  this.present_address.addressline2= this.addressDetailsForm.get('present_addressline2').value;
  this.present_address.districtcode= this.addressDetailsForm.get('present_districtcode').value;
  this.present_address.pincode= this.addressDetailsForm.get('present_pincode').value;
  this.present_address.addresstype= 'Present';
  this.present_address.sameaddress=this.addressDetailsForm.get('addresscheckbox').value;
  this.present_address.profileid= this.logintUserProfileId;
  this.registrationdetailsSrv.addAddress(this.present_address).subscribe((data) => {
    console.log('present POST addid= ' + data.addid);
    if(this.addressDetailsForm.get('addresscheckbox').value === false){
      console.log('+++++');
      this.permanent_address = new Address('', '', '', null,null,false,null);
      this.permanent_address.addressline1= this.addressDetailsForm.get('permanent_addressline1').value;
      this.permanent_address.addressline2= this.addressDetailsForm.get('permanent_addressline2').value;
      this.permanent_address.districtcode= this.addressDetailsForm.get('permanent_districtcode').value;
      this.permanent_address.pincode= this.addressDetailsForm.get('permanent_pincode').value;
      this.permanent_address.addresstype= 'Permanent';
      this.permanent_address.sameaddress=this.addressDetailsForm.get('addresscheckbox').value;
      this.permanent_address.profileid= this.logintUserProfileId;
      this.registrationdetailsSrv.addAddress(this.permanent_address).subscribe((data) => {
        console.log('permanent POST addid= ' + data.addid);
      },
      (err: HttpErrorResponse) => {
        console.log("Error status = "+ err.statusText);
       console.log("Error occured Address insert = "+ err.message);
      });
    }

  },
  (err: HttpErrorResponse) => {
    console.log("Error status = "+ err.statusText);
   console.log("Error occured Address insert = "+ err.message);
  });

  console.log("Same address Check box ="+this.addressDetailsForm.get('addresscheckbox').value);

}

updatePerson() {

  this.person = new Person('', null, '', null, '');
  this.person.fathername= this.personalDetailsForm.get('fathername').value;
  this.person.mothername= this.personalDetailsForm.get('mothername').value;
  this.person.guardianname= this.personalDetailsForm.get('guardianname').value;
  this.person.guardianmobileno= this.personalDetailsForm.get('guardianmobileno').value;
  this.person.gender= this.personalDetailsForm.get('gender').value;
  this.person.nationality= this.personalDetailsForm.get('nationality').value;
  this.person.state= this.stateTextSelected;
  this.person.religion= this.religionText;
  this.person.community= this.personalDetailsForm.get('community').value;
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



public isClickedAddressNext():void
{
  this.isnextAddressButton=true;
  this.isSelectOptionAddressInvalid= false;
  console.log("Present addressline1 =   "+this.addressDetailsForm.get('present_addressline1').value);
  console.log(" Present districtcode =   "+this.addressDetailsForm.get('present_districtcode').value);
  console.log(" Present pincode =   "+this.addressDetailsForm.get('present_pincode').value);

  console.log(" Permanent addressline1 =   "+this.addressDetailsForm.get('permanent_addressline1').value);
  console.log(" Permanent pincode=  "+this.addressDetailsForm.get('permanent_pincode').value);

  if(this.addressDetailsForm.get('present_districtcode').value === ""){

    this.isSelectOptionAddressInvalid= true;
  }

  if(this.addressDetailsForm.get('addresscheckbox').value === false && this.addressDetailsForm.get('permanent_districtcode').value === "")
    {
      this.isSelectOptionAddressInvalid= true;
      console.log("****** Invalid permanent adrress pincode **********")
    }

  if(this.isSelectOptionAddressInvalid === false)
  {
    this.addAddress();
  }

}


  // first personal details Next button click
  public isClickedPersonalNext():void{
    //this.myStepper.next();
    this.isnextPersonalButton= true;
    this.isSelectOptionPersonalInvalid= false;
    console.log(" Annual income =   "+this.personalDetailsForm.get('annualincome').value);
    console.log(" creamylayer=   "+this.personalDetailsForm.get('creamylayer').value);
    console.log(" gender=   "+this.personalDetailsForm.get('gender').value);
    console.log(" nationality=   "+this.personalDetailsForm.get('nationality').value);
    console.log("state=  "+this.personalDetailsForm.get('state').value);
    console.log(" religion ***=   "+this.religionText);

    if(this.personalDetailsForm.get('gender').value === ""){

      this.isSelectOptionPersonalInvalid= true;
    }

    if(this.personalDetailsForm.get('nationality').value === ""){

      this.isSelectOptionPersonalInvalid= true;
    }

    if(this.personalDetailsForm.get('state').value === ""){

      this.isSelectOptionPersonalInvalid= true;
    }

    if(this.personalDetailsForm.get('religion').value === ""){

      this.isSelectOptionPersonalInvalid= true;
    }
    if(this.personalDetailsForm.get('creamylayer').value === ""){

      this.isSelectOptionPersonalInvalid= true;
    }
    if(this.personalDetailsForm.controls['community'].value === null)
    {
      this.isSelectOptionPersonalInvalid= true;
    }

    if(this.personalDetailsForm.controls['annualincome'].value === null)
    {
      this.isSelectOptionPersonalInvalid= true;
    }

    if(this.isSelectOptionPersonalInvalid === false)
    {
      this.updatePerson();
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

/****** datepicker starts *******/

chosenYearHandler(normalizedYear: Moment,datepicker: MatDatepicker<Moment>,rows:any) {
  const ctrlValue = this.formEducationDetailsGroup.get('yearofpass').value;
  ctrlValue.year(normalizedYear.year());
  console.log("************ row ="+rows+"Year = "+moment(ctrlValue).format('yyyy'));
  console.log("************  this.formEducationDetailsGroup.get('qualificationtype').value = "+this.formEducationDetailsGroup.get('qualificationtype').value);
  this.formEducationDetailsGroup.controls['yearofpass'].setValue(ctrlValue);
  datepicker.close();
}

/*
_yearSelectedHandler($event, datepicker: MatDatepicker<Moment>) {

this.formEducationDetailsGroup.controls['yearofpass'].setValue(
  moment($event.value).format('yyyy'));
  console.log(" **** year of pass =   "+ moment($event.value).format('yyyy'));
  datepicker.close();
}


_yearSelectedHandler(chosenDate: Moment, datepicker: MatDatepicker<Moment>) {
    this.formEducationDetailsGroup.controls['yearofpass'].setValue(chosenDate, { emitEvent: false });
  this.onChange(chosenDate.toDate());
  this.onTouched();
  datepicker.close();
}
 writeValue(date: Date): void {
  if (date) {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
      this.formEducationDetailsGroup.controls['yearofpass'].setValue(moment(date), { emitEvent: false });
    }
  }
}

 onDateChange( date: Date ) :void{
  if (date) {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
      this.formEducationDetailsGroup.controls['yearofpass'].setValue(moment(date), { emitEvent: false });
    }
  }
}
*/
/****** datepicker ends *******/

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
  this.personalDetailsForm.controls['annualincome'].setValue(1);
  console.log(" *** creamy ="+mrChange.value);
  if(mrChange.value === 'true')
  {
    this.isEWSvisible = false;
  }
  else if(mrChange.value === 'false'){
    this.personalDetailsForm.controls['annualincome'].reset();
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
      // Kerala statecode =1
    this.stateTextSelected = $event.target.options[$event.target.options.selectedIndex].text;
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
 // Community is present for Hindu( 1 ) and Christain( 3 ) as per database value
  public  onChangeReligion($event){
    this.personalDetailsForm.controls['community'].setValue('N/A');
    this.isShowCommunity = false;
    let religionValue=$event.target.value;
    this.religionText=$event.target.options[$event.target.options.selectedIndex].text;
    console.log(" religionValue= "+$event.target.value);
    console.log(" religionText= "+this.religionText);
    // religionValue Hindu =1 and Christain =3
    if(religionValue == 1 || religionValue == 3){
    this.isShowCommunity =true;
    this.personalDetailsForm.controls['community'].reset();
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


  //Education Qualification
  get qualificationtype() { return this.formEducationDetailsGroup.get('qualificationtype'); }
  get institution() { return this.formEducationDetailsGroup.get('institution'); }
  get university() { return this.formEducationDetailsGroup.get('university'); }
  get yearofpass() { return this.formEducationDetailsGroup.get('yearofpass'); }
  get registrationno() { return this.formEducationDetailsGroup.get('registrationno'); }
  get cgpa() { return this.formEducationDetailsGroup.get('cgpa'); }
  get percentage() { return this.formEducationDetailsGroup.get('percentage'); }


  //******    Upload Documents REST api call status ******
  docUpload(event) {
    console.log('ApiResponse -> docUpload -> Event: ',event);
  }



}
