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
@Component({
  selector: 'app-reviewapplications',
  templateUrl: './reviewapplications.component.html',
  styleUrls: ['./reviewapplications.component.scss']
})
export class ReviewapplicationsComponent implements OnInit {
  deptuserid: any;
  errors = errorMessages;
  jsonreviewdata=[];
  personArray = new FormArray([]);
  jsonReviewStatus = [{key:1,value:'Registered'},{key:2,value:'Paid'},{key:3,value:'Completed'},{key:4,value:'Approve'},{key:5,value:'Reject'}];
  person: Person;
  //** ReviewApplicationDetails Table   **/
  displayedColumnsReviewApplicationDetails = ['profileid', 'fullname','emailid','status','reason'];
  @ViewChild('tableReviewApplicationDetails', { static: false }) tableReviewApplicationDetails: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSourceReviewApplicationDetails;

  constructor(private router: Router,private fb: FormBuilder,public adminhomeSrv: AdminhomeService,
              public notifyService: NotificationService ) { }

  ngOnInit(): void {
    this.jsonreviewdata=[];
    this.personArray =new FormArray([]);
    this.deptuserid = sessionStorage.getItem('deptuserid');
    this.adminhomeSrv.getAllApplications().subscribe((res ) => {
      for (const c of res) {
      console.log(" Review Application Details = "+c.profileid +" status ="+c.status);
      //let data={'profileid': c.profileid,'fullname': c.fullname,'emailid': c.emailid,'preview':'','status': c.status,'reason': c.reason};
     // this.personArray.push(this.createGroup({ profileid: c.profileid, fullname: c.fullname, emailid: c.emailid, status:c.status, reason:c.reason}));
     // this.personalDetailsForm.controls['profileid'].setValue(c.profileid);
      let formgroup = this.createGroup({ profileid: "", fullname: "", emailid: "",status:2000,reason:"" });
      formgroup.controls['profileid'].setValue(c.profileid);
      formgroup.controls['fullname'].setValue(c.fullname);

      this.personArray.push(formgroup);
      //this.personArray.push(this.personalDetailsForm);
     //this.jsonreviewdata.push(data);
      }

      this.dataSourceReviewApplicationDetails=  new MatTableDataSource(this.personArray.controls);
      //this.dataSourceReviewApplicationDetails = new MatTableDataSource(this.jsonreviewdata);
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



public personalDetailsForm= this.fb.group({
  profileid: [''],
  fullname: [''],
  emailid: [''],
  status: ['', [Validators.required]],
  reason: [''],
});
}
