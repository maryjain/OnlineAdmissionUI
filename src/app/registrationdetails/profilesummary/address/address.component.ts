import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegistrationdetailsService } from '../../service/registrationdetails.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  profileid = sessionStorage.getItem('profileid');
  constructor(private fb: FormBuilder,public registrationdetailsSrv: RegistrationdetailsService) { }

  ngOnInit(): void {
    this.registrationdetailsSrv.getAddressDetails(this.profileid).subscribe((res ) => {
      let json = res;
      for (var type in json[0]) {

        if(type ==='addressline1')
       {
         this.addressDetailsForm.controls['present_addressline1'].setValue(json[0][type]);
         console.log('************ '+type+'  = ' + this.addressDetailsForm.get('present_addressline1').value);
       }
      if(type ==='addressline2')
       {
         this.addressDetailsForm.controls['present_addressline2'].setValue(json[0][type]);
         console.log('************ '+type+'  = ' + this.addressDetailsForm.get('present_addressline2').value);
       }
       if(type ==='pincode')
       {
         this.addressDetailsForm.controls['present_pincode'].setValue(json[0][type]);
         console.log('************ '+type+'  = ' + this.addressDetailsForm.get('present_pincode').value);
       }
       if(type ==='addresstype')
       {
         this.addressDetailsForm.controls['present_addresstype'].setValue(json[0][type]);
         console.log('************ '+type+'  = ' + this.addressDetailsForm.get('present_addresstype').value);
       }
      }

      for (var type in json[1]) {

        if(type ==='addressline1')
       {
         this.addressDetailsForm.controls['permanent_addressline1'].setValue(json[1][type]);
         console.log('************ '+type+'  = ' + this.addressDetailsForm.get('permanent_addressline1').value);
       }
      if(type ==='addressline2')
       {
         this.addressDetailsForm.controls['permanent_addressline2'].setValue(json[1][type]);
         console.log('************ '+type+'  = ' + this.addressDetailsForm.get('permanent_addressline2').value);
       }
       if(type ==='pincode')
       {
         this.addressDetailsForm.controls['permanent_pincode'].setValue(json[1][type]);
         console.log('************ '+type+'  = ' + this.addressDetailsForm.get('permanent_pincode').value);
       }
       if(type ==='addresstype')
       {
         this.addressDetailsForm.controls['permanent_addresstype'].setValue(json[1][type]);
         console.log('************ '+type+'  = ' + this.addressDetailsForm.get('permanent_addresstype').value);
       }
      }

    },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Address = "+ err.message);

    });

  }

  public addressDetailsForm  = this.fb.group({
    permanent_addressline1: ['' ],
    permanent_addressline2: ['' ],
    permanent_addresstype: [''],
    permanent_pincode: [''],
    permanent_districtcode: [''],
    present_addressline1: [''],
    present_addressline2: [''],
    present_addresstype: [''],
    present_pincode: [''],
    present_districtcode: [''],

  });

}