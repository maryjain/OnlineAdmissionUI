import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.scss']
})
export class ProfiledetailsComponent implements OnInit {
  constructor(private fb: FormBuilder) {  }
  ngOnInit(): void {

  }
  isLinear = true;

  public formNameGroup  = this.fb.group({
    userName: ['', Validators.required]
  });

  public formPasswordGroup= this.fb.group({
    passWord: ['', Validators.required]
  });
  public formEmailGroup  = this.fb.group({
    emailID: ['', Validators.compose([Validators.required, Validators.email])]
  });
  public formPhoneGroup  = this.fb.group({
    mobile: ['', Validators.compose([Validators.required, Validators.min(10)])]
  });


}
