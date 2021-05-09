import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RegistrationdetailsService } from 'src/app/registrationdetails/service/registrationdetails.service';

@Component({
  selector: 'app-educationpreview',
  templateUrl: './educationpreview.component.html',
  styleUrls: ['./educationpreview.component.scss']
})
export class EducationpreviewComponent implements OnInit {
  profileid:any;
 // profileid = sessionStorage.getItem('profileid');
  displayedColumns = ['qualificationtype', 'institution', 'university', 'yearofpass', 'registrationno','cgpa','percentage'];
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  //EducationArray = new FormArray([]);
  dataSourceEducation;
  constructor(public registrationdetailsSrv: RegistrationdetailsService) { }

  ngOnInit(): void {
    this.profileid =history.state.data;
    this.registrationdetailsSrv.getEducation(this.profileid).subscribe((res ) => {
      console.log(" json Education ="+res[0]);
      this.dataSourceEducation = new MatTableDataSource(res);
    },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured dataSourceEducation = "+ err.message);
    });

  }

}
