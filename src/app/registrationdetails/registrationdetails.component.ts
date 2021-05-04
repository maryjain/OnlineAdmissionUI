import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrationdetails',
  templateUrl: './registrationdetails.component.html',
  styleUrls: ['./registrationdetails.component.scss']
})
export class RegistrationdetailsComponent implements OnInit {
  profileid:any;
  fullname:any;
  constructor(private router: Router){}
  ngOnInit(): void {
    this.map.set('Profile Summary', './profilesummary');
    this.map.set('Profile Details', './profiledetails');
    this.map.set('View Status', '');
    this.profileid=sessionStorage.getItem('profileid');
    this.fullname=sessionStorage.getItem('fullname');
  }
  public map: Map<string, string> = new Map<string, string>();

  getKeys(map){
    return Array.from(map.keys());
  }

  }




