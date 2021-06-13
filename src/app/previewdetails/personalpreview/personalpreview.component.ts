import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationdetailsService } from 'src/app/registrationdetails/service/registrationdetails.service';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-personalpreview',
  templateUrl: './personalpreview.component.html',
  styleUrls: ['./personalpreview.component.scss']
})
export class PersonalpreviewComponent implements OnInit , OnDestroy {
  public loading: boolean = false;
   profileid:any;
   isLoading = false;
   sub:any;
   json:any;
  //profileid = sessionStorage.getItem('profileid');


  constructor(private fb: FormBuilder, public registrationdetailsSrv: RegistrationdetailsService, private router :ActivatedRoute )
   {

   }

  ngOnInit(): void {
    this.isLoading = false;
     this.profileid = history.state.data;
   // this.profileid=this.router.snapshot.params;

    this.sub = this.router.params.subscribe(params => {
    this.profileid = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    console.log(" %%%%%%%%%  parent state "+this.profileid);

    const promise = new Promise<void>((resolve, reject) => {
      this.loading = true;
    this.registrationdetailsSrv.getPersonDetails(this.profileid)
    .toPromise()
    .then((res: any) => {
     this.json = res;
     resolve();
    },
      err => {
        // Error
        reject(err);
      }
    );
});

  promise.then( () => {
    this.loading = false;
    for (var type in this.json) {
      console.log(type + ' : ' +this.json[type])
      if(type ==='fullname')
     {
       this.personalDetailsForm.controls['fullname'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('fullname').value);
     }
    if(type ==='dob')
     {
       let dobValue = moment(this.json[type]).format('DD-MM-yyyy');
       this.personalDetailsForm.controls['dob'].setValue(dobValue);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('dob').value);
     }
     if(type ==='emailid')
     {
       this.personalDetailsForm.controls['emailid'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('emailid').value);
     }
     if(type ==='mobileno')
     {
       this.personalDetailsForm.controls['mobileno'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('mobileno').value);
     }
     if(type ==='gender')
     {
       this.personalDetailsForm.controls['gender'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('gender').value);
     }
     if(type ==='nationality')
     {
       this.personalDetailsForm.controls['nationality'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('nationality').value);
     }
     if(type ==='state')
     {
       this.personalDetailsForm.controls['state'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('state').value);
     }
     if(type ==='fathername')
     {
       this.personalDetailsForm.controls['fathername'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('fathername').value);
     }
     if(type ==='mothername')
     {
       this.personalDetailsForm.controls['mothername'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('mothername').value);
     }
     if(type ==='fullname')
     {
       this.personalDetailsForm.controls['fullname'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('fullname').value);
     }
     if(type ==='guardianname')
     {
       this.personalDetailsForm.controls['guardianname'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('guardianname').value);
     }
     if(type ==='guardianmobileno')
     {
       this.personalDetailsForm.controls['guardianmobileno'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('guardianmobileno').value);
     }
     if(type ==='annualincome')
     {
       this.personalDetailsForm.controls['annualincome'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('annualincome').value);
     }
     if(type ==='creamylayer')
     {
       this.personalDetailsForm.controls['creamylayer'].setValue(this.json[type]);
       console.log('************ '+type+'  = ' + this.personalDetailsForm.get('creamylayer').value);
     }
    }
  }
  );
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





  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
