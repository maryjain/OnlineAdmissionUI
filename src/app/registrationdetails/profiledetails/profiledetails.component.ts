import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Education } from 'src/app/model/Education';
import { AngularFileUploaderComponent } from 'src/app/shared/AngularFileUploader/angular-file-uploader.component';
import { Payment } from 'src/app/model/Payment';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import {MatDialog } from '@angular/material/dialog';
import {MatDialogConfig} from '@angular/material/dialog';
import { ProfilesummaryComponent } from 'src/app/registrationdetails/profilesummary/profilesummary.component';
import { PreviewdetailsComponent } from '../../previewdetails/previewdetails.component';
import { SessionstorageService } from 'src/app/shared/session/sessionstorage.service';

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
  providers: [UtilityService, RegistrationdetailsService, SessionstorageService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ProfiledetailsComponent  {
  //**Education Details  **/
  minDate: Date;
  maxDate: Date;
  displayedColumns = ['qualificationtype', 'institution', 'university', 'yearofpass', 'registrationno','cgpa','percentage','Delete'];
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  EducationArray = new FormArray([]);
  dataSource;
 //**Upload Documents Details  **/
  displayedColumnsUploadDocuments = ['documenttype', 'documentname'];
  @ViewChild('tableUploadDocuments', { static: false }) tableUploadDocuments: MatTable<any>;
  UploadDocumentsArray = new FormArray([]);
  dataSourceUploadDocuments;

  //**Payment Details   **/
  displayedColumnsPaymentDetails = ['transactionid', 'bank','applfees'];
  @ViewChild('tablePaymentDetails', { static: false }) tablePaymentDetails: MatTable<any>;
  PaymentDetailsArray = new FormArray([]);
  dataSourcePaymentDetails;

  //** Declaration **/
  enableDeclarationChkBox:boolean;

  enableDeclarationSubmitBtn:boolean;

//******    variable  declaration ******
  isLinear = false;  // for mat-tepper navigation property
  doctypeEWS:string;
  addresstype = {present:'Present Address',permanent:'Permanent Address'};
  logintUserProfileId :any;
  apiUrl = `${environment.profileapiUrl}`;
  //profileID: any;

  passYear:any;
  person: Person;
  present_address: Address;
  permanent_address: Address;
  education: Education;
  payment:Payment;
  errorlist: string[];
  jsonGender = [];
  jsonNationality = [];
  jsonReligion = [];
  jsonCommunity = [];
  jsonState = [];
  jsonDistrict= [];
  jsonQualification= [{key:1,value:'10th'},{key:2,value:'12th'},{key:3,value:'Degree'},{key:4,value:'PG'},{key:5,value:'PHD'},{key:6,value:'Certification'},{key:7,value:'Others'},{key:8,value:'Photo'},{key:9,value:'Sign'}];
  stateTextSelected:any;
  isnextPersonalButton:boolean;
  isnextAddressButton:boolean;
  isSelectOptionPersonalInvalid: boolean;
  isSelectOptionAddressInvalid: boolean;
  isnextEducationButton:boolean;
  isnextPaymentButton:boolean;
  isSelectOptionEducationInvalid:boolean;
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
    public registrationdetailsSrv: RegistrationdetailsService,public notifyService : NotificationService,
    private dialog: MatDialog,public router: Router,public sessionStorage: SessionstorageService) {

   }

   //******   ngOnInit declaration start ******
  ngOnInit(): void {
    this.doctypeEWS = "EWS";
    this.enableDeclarationChkBox=false;
    this.enableDeclarationSubmitBtn =false;
     //**Education Details  **/
    this.EducationArray.push(this.createGroup({ qualificationtype: "", institution: "", university: "",yearofpass:2000,registrationno:"",cgpa:0,percentage:0 }));
    this.dataSource = this.EducationArray.controls;

    //**Upload Documents Details  **/
    this.UploadDocumentsArray.push(this.createGroupUploadDocuments({ documenttype: "",documentname:""}));
    this.dataSourceUploadDocuments = this.UploadDocumentsArray.controls;

    //**Payment Details  **/
    this.PaymentDetailsArray.push(this.createGroupPaymentDetails({ transactionid: "", bank:"", applfees : 250}));
    this.dataSourcePaymentDetails = this.PaymentDetailsArray.controls;

    console.log(" jsonQualification =" +this.jsonQualification);
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 1);
    this.maxDate = new Date(currentYear + 1, 0, 0);


    //**Address Details  **/
    this.addressDetailsForm.get('addresscheckbox').setValue(false);

    //** Declaration **/
    this.formDeclarationGroup.get('declarationcheckbox').setValue(false);

    this.personalDetailsForm.controls['annualincome'].setValue(1);
    this.personalDetailsForm.controls['community'].setValue('N/A');
    this.isEWSvisible=false;
    this.isnextPersonalButton = false;
    this.isnextAddressButton = false;
    this.isShowCommunity = false;
    this.isSelectOptionPersonalInvalid= false;
    this.isSelectOptionAddressInvalid= false;
    this.isnextEducationButton = false;
    this.isnextPaymentButton = false;
    this.isSelectOptionEducationInvalid= false;
    // create object to be pass as json in rest api PUT,POST call

    this.person = new Person('', null, '', null, '');
    this.present_address = new Address('', '', '', null,null,false,null);
    this.permanent_address = new Address('', '', '', null,null,false,null);

    this.religionText="";
    this.logintUserProfileId = sessionStorage.getItem('profileid');
    console.log("______*****_____ logintUserProfileId="+ this.logintUserProfileId);

    this.fileuploadConfig.uploadAPI.url+= this.logintUserProfileId;
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

  });

  public formUploadDocumemtsGroup  = this.fb.group({

  });

  public formPaymentGroup  = this.fb.group({

  });

  public formDeclarationGroup  = this.fb.group({
   declarationcheckbox: ['', [Validators.required]]
  });

//******    Forms declaration  ends ******




//******    Events method declaration ******

//*** Declaration ***/
public openPreview()
{

this.enableDeclarationChkBox = true;
this.openDialog();
}
openDialog() {
  const dialogConfig = new MatDialogConfig();

  //dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  dialogConfig.data = {
      id: 1,

  };

  this.dialog.open(PreviewdetailsComponent, dialogConfig);
}

updateDeclaration():void
{
  this.registrationdetailsSrv.updateDeclaration(this.logintUserProfileId).subscribe((data) => {
    this.notifyService.showSuccess(" Application Submitted Succesfully", "Declaration");
    console.log('Declaration id  = ' + data.profileid);
  },
  (err: HttpErrorResponse) => {
    this.notifyService.showError("Error in submission of Declaration ", "Declaration")
   console.log("Error status = "+ err.statusText);
   console.log("Error occured Declaration = "+ err.message);
  });
}

//****  Payment Details *****/


public createGroupPaymentDetails(data: any) {

  data = data || {  transactionid: "", bank:"", applfees : 250};
  return this.fb.group({
    transactionid: ['', [Validators.required,Validators.pattern(customregExps.transactionid)]],
    bank: ['', [Validators.required,Validators.pattern(customregExps.fullName)]],
    applfees: ['', [Validators.required,Validators.pattern(customregExps.annualincome)]],
  });
}

POSTPayment()
{
  this.isnextPaymentButton = true;
  for (let c of this.PaymentDetailsArray.controls) {
    this.payment = new Payment(null, null, null,null);
    this.payment.transactionid= c.get('transactionid').value;
    if( c.get('bank').value === "")
    {
      this.payment.bank= null;
    }else{
      this.payment.bank= c.get('bank').value;
    }
    if(  c.get('applfees').value === "")
    {
      this.payment.applfees= null;
    }else{
      this.payment.applfees= c.get('applfees').value;
    }

    this.payment.profileid= this.logintUserProfileId;
    this.registrationdetailsSrv.addPayment(this.payment).subscribe((data) => {
      this.notifyService.showSuccess("Payment Transaction "+this.payment.transactionid+" Added Succesfully", "Payment Details")
      console.log('present POST paymentid = ' + data.paymentid);
    },
    (err: HttpErrorResponse) => {
      this.notifyService.showError("Payment Error", "Payment Details")
      console.log("Error status = "+ err.statusText);
     console.log("Error occured payment insert = "+ err.message);
    });
}
}


//**** Upload Documents *****/

public createGroupUploadDocuments(data: any) {

  data = data || { documenttype: "",documentname: ""};
  return this.fb.group({
    documenttype: ['', [Validators.required]],
    documentname: [''],

  });
}
addUploadDocuments():void
{

  this.UploadDocumentsArray.push(this.createGroupUploadDocuments(null));

  console.log("********** add UploadDocumentsArray len =" + this.UploadDocumentsArray.controls.length);


 this.tableUploadDocuments.renderRows();

}

removeUploadDocuments(index: number) {
  this.UploadDocumentsArray.removeAt(index);
 //this.dataSourceUploadDocuments = this.UploadDocumentsArray.controls;
  this.tableUploadDocuments.renderRows();
}

//*** Upload Document ends *****/

//**** Education qualification ***/


/****** datepicker starts *******/

chosenYearHandler(normalizedYear: Moment,datepicker: MatDatepicker<Moment>,rows:any,element:any) {

   let ctrlValue = element.value.value;
if(ctrlValue === null || ctrlValue === undefined)
{
  ctrlValue = element.value;
}
   console.log("**** +++ ctrlValue= "+ctrlValue);
   ctrlValue.year(normalizedYear.year());
  console.log("************ row ="+rows+"   Year = "+moment(ctrlValue).format('yyyy'));
 // console.log("************  element.get('qualificationtype').value= "+element.get('qualificationtype').value);
  element.setValue(ctrlValue);
  datepicker.close();
}

/****** datepicker ends *******/


public createGroup(data: any) {
  data = data || { qualificationtype: "", institution: "", university: "",yearofpass:2000,registrationno:"",cgpa:0,percentage:0};
  return this.fb.group({
    qualificationtype: ['', [Validators.required]],
    institution: ['', [Validators.required,Validators.pattern(customregExps.fullName)]],
    university: ['', [Validators.required,Validators.pattern(customregExps.fullName)]],
    yearofpass: [new FormControl(moment()), [Validators.required,Validators.pattern(customregExps.yearofpass)]],
    registrationno: ['', [Validators.required,Validators.pattern(customregExps.registrationno)]],
    cgpa: ['', [Validators.required,Validators.pattern(customregExps.cgpa)]],
    percentage: ['', [Validators.required,Validators.pattern(customregExps.percentage)]],
  });
}
addQualification():void
{
  this.EducationArray.push(this.createGroup(null));
  console.log("********** add EducationArray len =" + this.EducationArray.controls.length);
  this.table.renderRows();

}

removeQualification(index: number):void {
  this.EducationArray.removeAt(index);
  this.table.renderRows();
}


POSTEducation()
{
  for (let c of this.EducationArray.controls) {
    this.education = new Education('', null, null, null,null,null,null,null);
    this.education.qualificationtype= c.get('qualificationtype').value;
    if( c.get('institution').value === "")
    {
      this.education.institution= null;
    }else{
      this.education.institution= c.get('institution').value;
    }
    if(  c.get('university').value === "")
    {
      this.education.university= null;
    }else{
      this.education.university= c.get('university').value;
    }
    this.education.yearofpass=Number(moment(c.get('yearofpass').value).format('yyyy')) ;
    console.log("this.education.yearofpass ="+this.education.yearofpass);

    if(  c.get('registrationno').value === "")
    {
      this.education.registrationno= null;
    }else{
      this.education.registrationno= c.get('registrationno').value;
    }
    if(  c.get('cgpa').value === "")
    {
      this.education.cgpa= 0.0;
    }else{
      this.education.cgpa= c.get('cgpa').value;
    }
    if(  c.get('percentage').value === "")
    {
      this.education.percentage= 0.0;
    }else{
      this.education.percentage= c.get('percentage').value;
    }

    this.education.profileid= this.logintUserProfileId;
    this.registrationdetailsSrv.addEducation(this.education).subscribe((data) => {
      this.notifyService.showSuccess(" Added Succesfully", " Education Qualification");
      console.log('present POST educaid = ' + data.educaid);
    },
    (err: HttpErrorResponse) => {
      this.notifyService.showError("Error while adding details", " Education Qualification");
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Education insert = "+ err.message);
    });
}
}

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
    this.notifyService.showSuccess(" Added Succesfully", "Present Address Details");
    console.log('present POST addid= ' + data.addid);
    this.permanent_address = new Address('', '', '', null,null,false,null);
    this.permanent_address.addressline1= this.addressDetailsForm.get('permanent_addressline1').value;
    this.permanent_address.addressline2= this.addressDetailsForm.get('permanent_addressline2').value;
    this.permanent_address.districtcode= this.addressDetailsForm.get('permanent_districtcode').value;
    this.permanent_address.pincode= this.addressDetailsForm.get('permanent_pincode').value;
    this.permanent_address.sameaddress=this.addressDetailsForm.get('addresscheckbox').value;
    this.permanent_address.addresstype= 'Permanent';
    this.permanent_address.profileid= this.logintUserProfileId;
    this.registrationdetailsSrv.addAddress(this.permanent_address).subscribe((data) => {
    this.notifyService.showSuccess(" Added Succesfully", "Permanent Address Details");
    console.log('permanent POST addid= ' + data.addid);
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError("Error while adding Permanent address details", "Permanent Address Details");
        console.log("Error status = "+ err.statusText);
       console.log("Error occured Address insert = "+ err.message);
      });


  },
  (err: HttpErrorResponse) => {
    this.notifyService.showError("Error while Present address add details", "Present Address Details");
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
    this.notifyService.showSuccess(" Added Succesfully", "Personal Details");
    console.log('PUT profileid= ' + data.profileid);

   //this.router.navigate(['/login']);
  },
  (err: HttpErrorResponse) => {
    this.notifyService.showError("Error while add details", "Personal Details");
    console.log("Error status = "+ err.statusText);
   console.log("Error occured update personal details = "+ err.message);

  });
}

public isClickeEducationNext():void{
  this.isnextEducationButton = true;
  this.isSelectOptionEducationInvalid= false;
  this.POSTEducation();
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

  onEnableDeclaration()
  {
    this.enableDeclarationSubmitBtn = true;
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




  //******    Upload Documents REST api call status ******
  docUpload(event) {
    console.log('ApiResponse -> docUpload -> Event: ',event);
  }



}
