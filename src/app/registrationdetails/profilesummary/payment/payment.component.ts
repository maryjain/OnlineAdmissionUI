import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RegistrationdetailsService } from '../../service/registrationdetails.service';
import * as moment from 'moment';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  profileid = sessionStorage.getItem('profileid');
  //**Payment Details   **/
  displayedColumnsPaymentDetails = ['transactionid', 'bank','applfees','updateddate'];
  @ViewChild('tablePaymentDetails', { static: false }) tablePaymentDetails: MatTable<any>;

  dataSourcePaymentDetails;
  constructor(public registrationdetailsSrv: RegistrationdetailsService) { }

  ngOnInit(): void {
    this.registrationdetailsSrv.getPayment(this.profileid).subscribe((res ) => {
      let json = [];
      let dobValue = moment(res.updateddate).format('DD-MM-yyyy');
      let data={'transactionid': res.transactionid, 'bank': res.bank,'applfees': res.applfees,'updateddate': dobValue};
      json.push(data);
      console.log(" json payment ="+json[0][0]);
      this.dataSourcePaymentDetails = new MatTableDataSource(json);

    },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured Religion = "+ err.message);

    });
  }

}
