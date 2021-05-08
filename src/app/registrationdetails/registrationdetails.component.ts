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
  loggedIn:boolean;
  constructor(private router: Router){}
  ngOnInit(): void {
    this.map.set('Profile Summary', 'profilesummary');
    this.map.set('Register Profile Details', 'profiledetails');
    this.map.set('View Status', 'viewstatus');
    this.profileid = sessionStorage.getItem('profileid');
    this.fullname = sessionStorage.getItem('fullname');
    console.log('************  sessionStorage.getItem(loggedIn) = ' + sessionStorage.getItem('loggedIn'));

    console.log('***********%%% final submit '+ sessionStorage.getItem('finalsubmit'));
    if(sessionStorage.getItem('loggedIn')=== 'true')
    {
      console.log('***********++++ ');
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
    }

    console.log('** this.loggedIn'+ this.loggedIn);
  }
  public map: Map<string, string> = new Map<string, string>();

  getKeys(map){
    return Array.from(map.keys());
  }

  onsidenavClick(item:any)
  {
    console.log('** %% item ' +item);
    console.log('***********%%% final submit '+ sessionStorage.getItem('finalsubmit'));
    this.router.navigate(['/registrationdetails/'+item]);


  }

  public logoutUser():void
  {
    sessionStorage.clear();
  }

}




