import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-previewdetails',
  templateUrl: './previewdetails.component.html',
  styleUrls: ['./previewdetails.component.scss'],

})
export class PreviewdetailsComponent implements OnInit {
showtabs:boolean;
profileid:any;
  constructor(public router: Router, public dialogRef: MatDialogRef<PreviewdetailsComponent>, @Inject(MAT_DIALOG_DATA) data) {

  this.profileid=data.id;
  console.log("__________________Dialog ____________= "+this.profileid);
  }

  ngOnInit(): void {
    this.router.navigate(['/personalpreview'] , {state: {data: this.profileid}});
    this.showtabs=false;
  }

  showTabsClick():void
  {
    this.showtabs=true;
  }

  onConfirmClick(): void {
    this.router.navigate(['/registrationdetails/profiledetails']);
    this.dialogRef.close(true);
  }

}
