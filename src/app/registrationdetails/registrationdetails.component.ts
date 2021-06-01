import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';
import { Person } from '../model/Person';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-registrationdetails',
  templateUrl: './registrationdetails.component.html',
  styleUrls: ['./registrationdetails.component.scss']
})
export class RegistrationdetailsComponent implements OnInit {
  profileid:any;
  fullname:any;
  loggedIn:boolean;
  emailid:string;
  person: Person;
  constructor(private router: Router,public loginsrv: LoginService, public notifyService: NotificationService ){}
  ngOnInit(): void {

    this.person = new Person('', null,
    sessionStorage.getItem('email'), null,null);
    this.loginsrv.login(this.person).subscribe((res) => {
      console.log('POST login res = ' + res);
      console.log('POST login status= ' + res.status);
      if(res.data === "true"){
        sessionStorage.setItem('status',res.status);
      }
      else{
        sessionStorage.setItem('status','Registered');
      }
    },
      (err) => {
        this.notifyService.showError(" Error while Getting Details", "Registration");
        console.log("err.error = " + err.error);
        }

     );

    if(sessionStorage.getItem('status')==='Registered')
    {
    this.map.set('Profile Summary', 'profilesummary');
    this.map.set('Register Profile Details', 'profiledetails');
    this.map.set('View Status', 'viewstatus');
    }
    else{
    this.map.set('Profile Summary', 'profilesummary');
    this.map.set('View Status', 'viewstatus');
    }
    this.profileid = sessionStorage.getItem('profileid');
    this.fullname = sessionStorage.getItem('name');
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




