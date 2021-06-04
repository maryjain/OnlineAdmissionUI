import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import { RegistrationdetailsService } from '../registrationdetails/service/registrationdetails.service';
@Component({
  selector: 'app-previewdetails',
  templateUrl: './previewdetails.component.html',
  styleUrls: ['./previewdetails.component.scss'],

})
export class PreviewdetailsComponent implements OnInit {

showtabs: boolean;
profileid: bigint;
  constructor(public router: Router, public dialogRef: MatDialogRef<PreviewdetailsComponent>, @Inject(MAT_DIALOG_DATA) data, public regsrv: RegistrationdetailsService) {

  this.profileid=JSON.parse(data.id);
  console.log("__________________Dialog ____________= "+this.profileid);
  }

  ngOnInit(): void {

    this.router.navigate(['/personalpreview',this.profileid]);
    this.showtabs = false;
  }

  showTabsClick():void
  {
    this.showtabs=true;
  }

  onConfirmClick(): void {

    if(sessionStorage.getItem('user')==='user')
    {
      this.router.navigate(['/registrationdetails/profiledetails', {data: 5 }])
      .then(() => {
        setTimeout(()=> 10, 2000);

     });

    }
    else if (sessionStorage.getItem('user')==='admin'){

      this.router.navigate(['/adminhome/reviewapplications'])
      .then(() => {
       setTimeout(()=>8, 2000);
     });

    }

    this.dialogRef.close(true);
    this.regsrv.filters("Dialog close");
  }


}
