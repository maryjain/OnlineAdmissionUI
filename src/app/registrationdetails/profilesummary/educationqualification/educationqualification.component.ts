import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RegistrationdetailsService } from '../../service/registrationdetails.service';

@Component({
  selector: 'app-educationqualification',
  templateUrl: './educationqualification.component.html',
  styleUrls: ['./educationqualification.component.scss']
})
export class EducationqualificationComponent implements OnInit {
  profileid :any;
  displayedColumns = ['qualificationtype', 'institution', 'university', 'yearofpass', 'registrationno','cgpa','percentage'];
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  //EducationArray = new FormArray([]);
  dataSourceEducation;
  constructor(public registrationdetailsSrv: RegistrationdetailsService) { }

  ngOnInit(): void {
    this.profileid = JSON.parse(sessionStorage.getItem('profileid'));
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
