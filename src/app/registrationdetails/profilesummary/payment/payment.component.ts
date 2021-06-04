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
  profileid : any;
  //**Payment Details   **/
  displayedColumnsPaymentDetails = ['transactionid', 'bank','applfees','updateddate'];
  @ViewChild('tablePaymentDetails', { static: false }) tablePaymentDetails: MatTable<any>;

  dataSourcePaymentDetails;
  constructor(public registrationdetailsSrv: RegistrationdetailsService) { }

  ngOnInit(): void {
    this.profileid = JSON.parse(sessionStorage.getItem('profileid'));
    this.registrationdetailsSrv.getPayment(this.profileid).subscribe((res ) => {
      let json = [];
      let dobValue = '';
      let data={};
      console.log("Payment res  ="+res);
      if(res!=null ){
        dobValue= moment(res.updateddate).format('DD-MM-yyyy');
        data={'transactionid': res.transactionid, 'bank': res.bank,'applfees': res.applfees,'updateddate': dobValue};
      }
      else{
        data={'transactionid': '', 'bank': '','applfees': '','updateddate': ''};
      }

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
