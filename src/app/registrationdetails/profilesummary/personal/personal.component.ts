import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationdetailsService } from '../../service/registrationdetails.service';
import * as moment from 'moment';



@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
profileid :any;

  constructor(private fb: FormBuilder, public registrationdetailsSrv: RegistrationdetailsService) { }

  ngOnInit(): void {
    this.profileid = JSON.parse(sessionStorage.getItem('profileid'));
    console.log('************ ##########  '+ sessionStorage.getItem('profileid'));
    this.registrationdetailsSrv.getPersonDetails(this.profileid).subscribe((res ) => {
      let json = res;
      for (var type in json) {
        console.log(type + ' : ' +json[type])
        if(type ==='fullname')
       {
         this.personalDetailsForm.controls['fullname'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('fullname').value);
       }
      if(type ==='dob')
       {
         let dobValue = moment(json[type]).format('DD-MM-yyyy');
         this.personalDetailsForm.controls['dob'].setValue(dobValue);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('dob').value);
       }
       if(type ==='emailid')
       {
         this.personalDetailsForm.controls['emailid'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('emailid').value);
       }
       if(type ==='mobileno')
       {
         this.personalDetailsForm.controls['mobileno'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('mobileno').value);
       }
       if(type ==='gender')
       {
         this.personalDetailsForm.controls['gender'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('gender').value);
       }
       if(type ==='nationality')
       {
         this.personalDetailsForm.controls['nationality'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('nationality').value);
       }
       if(type ==='state')
       {
         this.personalDetailsForm.controls['state'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('state').value);
       }
       if(type ==='fathername')
       {
         this.personalDetailsForm.controls['fathername'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('fathername').value);
       }
       if(type ==='mothername')
       {
         this.personalDetailsForm.controls['mothername'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('mothername').value);
       }
       if(type ==='fullname')
       {
         this.personalDetailsForm.controls['fullname'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('fullname').value);
       }
       if(type ==='guardianname')
       {
         this.personalDetailsForm.controls['guardianname'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('guardianname').value);
       }
       if(type ==='guardianmobileno')
       {
         this.personalDetailsForm.controls['guardianmobileno'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('guardianmobileno').value);
       }
       if(type ==='annualincome')
       {
         this.personalDetailsForm.controls['annualincome'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('annualincome').value);
       }
       if(type ==='creamylayer')
       {
         this.personalDetailsForm.controls['creamylayer'].setValue(json[type]);
         console.log('************ '+type+'  = ' + this.personalDetailsForm.get('creamylayer').value);
       }
      }
     },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Religion = "+ err.message);

    });
  }


  public personalDetailsForm  = this.fb.group({
    fullname: [''],
    dob:[''],
    gender:[''],
    nationality:[''],
    religion:[''],
    community:[''],
    emailid:[''],
    mobileno:[''],
    state: [''],
    fathername: [''],
    mothername: [''],
    guardianname: [''],
    guardianmobileno: [''],
    annualincome:  [''],
    creamylayer:['']
  });
}
