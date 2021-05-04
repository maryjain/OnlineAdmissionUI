import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-educationqualification',
  templateUrl: './educationqualification.component.html',
  styleUrls: ['./educationqualification.component.scss']
})
export class EducationqualificationComponent implements OnInit {
  profileid = sessionStorage.getItem('profileid');
  displayedColumns = ['qualificationtype', 'institution', 'university', 'yearofpass', 'registrationno','cgpa','percentage','Delete'];
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  EducationArray = new FormArray([]);
  dataSource;
  constructor() { }

  ngOnInit(): void {
  }

}
