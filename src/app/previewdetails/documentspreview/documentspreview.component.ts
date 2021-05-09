import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RegistrationdetailsService } from 'src/app/registrationdetails/service/registrationdetails.service';
import { Documentupload } from 'src/app/model/Documentupload';
import * as moment from 'moment';
@Component({
  selector: 'app-documentspreview',
  templateUrl: './documentspreview.component.html',
  styleUrls: ['./documentspreview.component.scss']
})
export class DocumentspreviewComponent implements OnInit {
  profileid:any;
  displayedColumnsDocumentstDetails = ['documenttype', 'documentformat','updateddate','converteddata'];
  @ViewChild('tableDocumentsDetails', { static: false }) tableDocumentsDetails: MatTable<any>;
  dataSourceDocumentsDetails;
  documentsArray = new FormArray([]);
  constructor(public registrationdetailsSrv: RegistrationdetailsService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileid =history.state.data;
    this.documentsArray = new FormArray([]);
    this.registrationdetailsSrv.getAllDocumentByprofileId(this.profileid).subscribe((res ) => {
      for ( let c of res) {
        console.log(" Review Document Details = "+c.documenttype );
        let formgroup = this.createGroup({  documenttype: "", documentformat: "", updateddate: "",converteddata:"" });
        formgroup.controls['documenttype'].setValue(c.documenttype);
        formgroup.controls['documentformat'].setValue(c.documentformat);
        const dateValue = moment(c.updateddate).format('DD-MM-yyyy');
        formgroup.controls['updateddate'].setValue(dateValue);
        var reader = new FileReader();
        const byteCharacters = atob(c.converteddata);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);
        reader.readAsDataURL( new Blob([byteArray], { type: 'image/jpeg' }));
        reader.onload = (event) => { // called once readAsDataURL is completed
        formgroup.controls['converteddata'].setValue(event.target.result);
        console.log("***********+++++++++++********************  this.url =");
      };
        this.documentsArray.push(formgroup);
        }
      this.dataSourceDocumentsDetails = new MatTableDataSource(this.documentsArray.controls);
    },
    (err: HttpErrorResponse) => {
      console.log("Error status = "+ err.statusText);
     console.log("Error occured document = "+ err.message);

    });
  }

  public createGroup(data: any) {
    data = data || { documenttype: "", documentformat: "", updateddate: "",converteddata:""};
    return this.fb.group({
      documenttype: [''],
      documentformat: [''],
      updateddate: [''],
      converteddata: [''],

    });
  }
}
