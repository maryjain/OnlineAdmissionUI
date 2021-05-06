import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RegistrationdetailsService } from '../service/registrationdetails.service';

@Component({
  selector: 'app-viewstatus',
  templateUrl: './viewstatus.component.html',
  styleUrls: ['./viewstatus.component.scss']
})
export class ViewstatusComponent implements OnInit {
  profileid = sessionStorage.getItem('profileid');
  displayedColumnsViewStatusDetails = ['profileid', 'status', 'reason'];
  @ViewChild('tableViewStatusDetails', { static: false }) tableViewStatusDetails: MatTable<any>;

  dataSourceViewStatusDetails;
  constructor(public registrationdetailsSrv: RegistrationdetailsService) { }

  ngOnInit(): void {
    this.registrationdetailsSrv.getPersonDetails(this.profileid).subscribe((res ) => {
      let json=[];

      let data={'profileid': res.profileid, 'status': res.status, 'reason': res.reason };
      json.push(data);
      this.dataSourceViewStatusDetails = new MatTableDataSource(json);
    },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured ViewStatusDetails = "+ err.message);

    });
  }

}
