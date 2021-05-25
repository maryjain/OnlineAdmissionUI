import { HttpErrorResponse } from '@angular/common/http';
import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminhomeService } from '../service/adminhome.service';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],

})
export class HomepageComponent implements OnInit   {

  displayedColumnsViewStatusDetails = ['status', 'count'];
  @ViewChild('tableViewStatusDetails', { static: true }) tableViewStatusDetails: MatTable<any>;

  dataSourceViewStatusDetails;
  constructor(private router: Router,public adminhomeSrv: AdminhomeService) {
   }

  ngOnInit(): void {

    this.adminhomeSrv.getApplicationstatus().subscribe((res ) => {
      this.dataSourceViewStatusDetails = new MatTableDataSource(res);
    },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Applicationstatus = "+ err.message);

    });

  }
}
