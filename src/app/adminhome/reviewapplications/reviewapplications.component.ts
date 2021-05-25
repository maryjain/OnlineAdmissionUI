import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/model/Person';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { AdminhomeService } from '../service/adminhome.service';
import {errorMessages} from '../../helpers/CustomMessges';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PreviewdetailsComponent } from 'src/app/previewdetails/previewdetails.component';
import { RegistrationdetailsService } from 'src/app/registrationdetails/service/registrationdetails.service';
import {Location} from "@angular/common";
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-reviewapplications',
  templateUrl: './reviewapplications.component.html',
  styleUrls: ['./reviewapplications.component.scss']
})
export class ReviewapplicationsComponent implements OnInit , OnDestroy{

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
              public notifyService: NotificationService , private dialog: MatDialog, private activerouter :ActivatedRoute, public registersrv: RegistrationdetailsService,private location: Location )
              {
                this.registersrv.listen().subscribe((m:any)=>{
                console.log(" m listen"+ m);
                this.location.replaceState('/adminhome/reviewapplications');
                delay(2000);
                window.location.reload();
                });

              }

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

  postPersonReview(currentprofileid:any)
{
    const previewProfileid=  currentprofileid.value;
    this.person = new Person('', null, '', null,'');
    let c: AbstractControl;
    for (let index in this.personArray.controls) {
      console.log('@@@@@@@@@ ###### inside for loop row = ' + index);
    c = this.personArray.controls[index];
    if( c.get('profileid').value == previewProfileid )
    {
      console.log('@@@@@@@@@ ###### loop previewProfileid = ' + previewProfileid);
      this.person.profileid= c.get('profileid').value;
      this.person.status= c.get('status').value;
      this.person.reason= c.get('reason').value;
    }
    }
    this.adminhomeSrv.updatePersonReview(this.person).subscribe((data) => {
      this.notifyService.showSuccess(" Added Succesfully", " Application Review");
      console.log('PUT review profileid = ' + data.profileid);
    },
    (err: HttpErrorResponse) => {
      this.notifyService.showError("Error while adding review details", " Application Review");
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Education insert = "+ err.message);
    });

}

showPersonReview(currentprofileid:any)
{
  const previewProfileid=  currentprofileid.value;
  console.log('################%%%%&&&&  review profileid ' + currentprofileid.value);
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

ngOnDestroy() {

}

}
