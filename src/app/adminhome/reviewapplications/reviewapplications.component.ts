import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Person } from 'src/app/model/Person';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AdminhomeService } from '../service/adminhome.service';
import {errorMessages} from '../../helpers/CustomMessges';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PreviewdetailsComponent } from 'src/app/previewdetails/previewdetails.component';
@Component({
  selector: 'app-reviewapplications',
  templateUrl: './reviewapplications.component.html',
  styleUrls: ['./reviewapplications.component.scss']
})
export class ReviewapplicationsComponent implements OnInit {
  deptuserid: any;
  errors = errorMessages;

  personArray = new FormArray([]);
  jsonReviewStatus = [{key:1,value:'Registered'},{key:2,value:'Paid'},{key:3,value:'Completed'},{key:4,value:'Approve'},{key:5,value:'Reject'}];
  person: Person;
  //** ReviewApplicationDetails Table   **/
  displayedColumnsReviewApplicationDetails = ['profileid', 'fullname','emailid','status','reason','preview','submit'];
  @ViewChild('tableReviewApplicationDetails', { static: false }) tableReviewApplicationDetails: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSourceReviewApplicationDetails;

  constructor(private router: Router,private fb: FormBuilder,public adminhomeSrv: AdminhomeService,
              public notifyService: NotificationService , private dialog: MatDialog) { }

  ngOnInit(): void {

    this.personArray =new FormArray([]);
    this.deptuserid = sessionStorage.getItem('deptuserid');
    this.adminhomeSrv.getAllApplications().subscribe((res ) => {
      for (const c of res) {
      console.log(" Review Application Details = "+c.profileid +" status ="+c.status);
      let formgroup = this.createGroup({ profileid: "", fullname: "", emailid: "",status:"",reason:"" });
      formgroup.controls['profileid'].setValue(c.profileid);
      formgroup.controls['fullname'].setValue(c.fullname);
      formgroup.controls['emailid'].setValue(c.emailid);
      formgroup.controls['status'].setValue(c.status);
      formgroup.controls['reason'].setValue(c.reason);
      this.personArray.push(formgroup);
      }

      this.dataSourceReviewApplicationDetails=  new MatTableDataSource(this.personArray.controls);
      this.dataSourceReviewApplicationDetails.paginator = this.paginator;
    },
    (err: HttpErrorResponse) => {
      console.log("Error status ReviewApplicationDetails = "+ err.statusText);
     console.log("Error occured dataSource ReviewApplicationDetails = "+ err.message);
    });
  }


  public createGroup(data: any) {
    data = data || { profileid: "", fullname: "", emailid: "",status:"",reason:""};
    return this.fb.group({
      profileid: [''],
      fullname: [''],
      emailid: [''],
      status: ['', [Validators.required]],
      reason: [''],
    });
  }

postPersonReivew(row:number)
{
    let c: AbstractControl;
    c = this.personArray.controls[row];
    this.person = new Person('', null, '', null,'');
    this.person.profileid= c.get('profileid').value;
    this.person.status= c.get('status').value;
    this.person.reason= c.get('reason').value;
    this.adminhomeSrv.updatePersonReivew(this.person).subscribe((data) => {
      this.notifyService.showSuccess(" Added Succesfully", " Application Review");
      console.log('PUT review profileid = ' + data.profileid);
    },
    (err: HttpErrorResponse) => {
      this.notifyService.showError("Error while adding review details", " Application Review");
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Education insert = "+ err.message);
    });

}

showPersonReview(row:number)
{
  let c: AbstractControl;
  c = this.personArray.controls[row];
  const previewProfileid=  c.get('profileid').value;
  this.openDialog(previewProfileid);
}


openDialog(previewProfileid:any) {
  const dialogConfig = new MatDialogConfig();

  //dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  dialogConfig.data = {
      id: previewProfileid,

  };

  this.dialog.open(PreviewdetailsComponent, dialogConfig);
 // .afterClosed()
  //.subscribe(() => window.opener.location.reload());
}


public personalDetailsForm= this.fb.group({
  profileid: [''],
  fullname: [''],
  emailid: [''],
  status: ['', [Validators.required]],
  reason: [''],
});
}
