import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { browser } from 'protractor';
import { LoginService } from '../login/service/login.service';
import { Person } from '../model/Person';
import { NotificationService } from '../shared/notification/notification.service';


@Component({
  selector: 'app-registrationdetails',
  templateUrl: './registrationdetails.component.html',
  styleUrls: ['./registrationdetails.component.scss']
})
export class RegistrationdetailsComponent implements OnInit {
  public loading: boolean = false;
  profileid="";
  fullname:any;
  loggedIn:boolean;
  emailid:string;
  person: Person;
  personPost: Person;
  public map: Map<string, string> = new Map<string, string>();
  constructor(private router: Router,public loginsrv: LoginService, public notifyService: NotificationService  ){}

  ngOnInit(): void {
    this.personPost= new Person(null,null,null, null,
    sessionStorage.getItem('email'), null,null);


    if(sessionStorage.getItem('profileid') != null){
    this.profileid = sessionStorage.getItem('profileid');
    }
    this.fullname = sessionStorage.getItem('name');
    console.log("++++++ &&&&&&&& expires_in  "+sessionStorage.getItem('expires_in'));
    console.log("++++++ &&&&&& accessToken  "+sessionStorage.getItem('accessToken'));
    console.log("++++++ &&&&&& IDToken  "+sessionStorage.getItem('idToken'));
    console.log("++++++ &&&&&& Json access token  "+sessionStorage.getItem('jsonAccessToken'));
    let jsonaccessToken= sessionStorage.getItem('jsonAccessToken');
    console.log("++++++ &&&&&& Roles  "+JSON.parse(jsonaccessToken)["realm_access"]["roles"]);

    this.person = new Person(null,null,'',null,
    sessionStorage.getItem('email'), null,null);


    /////////////////////////////////////////////////////////
  /*  this.loginsrv.login(this.person).subscribe((res) => {
      console.log('POST login res data= ' + res.data);
      console.log('POST login status= ' + res.status);
      if(res != null && res.data === "true" && res.status != null){
        sessionStorage.setItem('status',res.status);
        sessionStorage.setItem('profileid',res.id);
        console.log("&&&&  session profileid = " + sessionStorage.getItem('profileid'));
        console.log('&&&&  session status= ' + sessionStorage.getItem('status'));
      }
      else{
        sessionStorage.setItem('status','New');
        console.log('+++++++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      }

    },
      (err) => {
        this.notifyService.showError(" Error while Getting Details", "Registration");
        console.log("err = " + err.error);
        console.log("err.error = " + err.error);
        }

     );
     */
//////////////////////////////////////////////////


  const promise = new Promise<void>((resolve, reject) => {
    this.loading = true;
    this.loginsrv.login(this.person)
      .toPromise()
      .then((res: any) => {
        // Success
        this.personPost =  new Person(JSON.parse(res.id),res.status,'', null,
          sessionStorage.getItem('email'), null,null);

        resolve();
      },
        err => {
          // Error
          reject(err);
        }
      );
  });

  promise.then( () => {
    console.log('+++++++++++++++++++++++@@@@@@@@@@@@@@@@@@@@@@@@@@@@ '+this.personPost.status);
    this.loading = false;
    if(this.personPost.status === null)
    {
      sessionStorage.setItem('status','New');
      console.log('+++++++++++++++++++++++%%%%%%%%%%%%%%%%%%%%%%%% '+sessionStorage.getItem('status'));
    }
    else {
      sessionStorage.setItem('status', this.personPost.status);
      sessionStorage.setItem('profileid', this.personPost.profileid.toString());
      this.profileid = sessionStorage.getItem('profileid');
      console.log('+++++++++++++++++++++++#################################### '+sessionStorage.getItem('status'));

    }

    if(sessionStorage.getItem('status')==='New')
    {
    this.map.set('Basic Profile Information ', 'register');
    this.map.set('Personal Details', 'profiledetails');
    this.map.set('Profile Summary', 'profilesummary');
    this.map.set('View Status', 'viewstatus');
    }
    else if(sessionStorage.getItem('status') ==='Registered' || sessionStorage.getItem('status') ==='Paid')
    {
    this.map.set('Personal Details', 'profiledetails');
    this.map.set('Profile Summary', 'profilesummary');
    this.map.set('View Status', 'viewstatus');
    }
    else if(sessionStorage.getItem('status')==='Completed'|| sessionStorage.getItem('status')==='Reject' || sessionStorage.getItem('status')==='Approve'){
    this.map.set('Profile Summary', 'profilesummary');
    this.map.set('View Status', 'viewstatus');
    }
  });





/********************************************************************** */
     console.log("  ***********************   session status ="+sessionStorage.getItem('status'));
     console.log("  ***********************   session profileid ="+sessionStorage.getItem('profileid'));
      console.log('************  sessionStorage.getItem(loggedIn) = ' + sessionStorage.getItem('loggedIn'));

    console.log('***********%%% final submit '+ sessionStorage.getItem('finalsubmit'));
    if(sessionStorage.getItem('loggedIn') === 'true')
    {
      console.log('***********++++ ');
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
    }

    console.log('** this.loggedIn'+ this.loggedIn);
  }




  getKeys(map){
    return Array.from(map.keys());
  }

  onsidenavClick(item:any)
  {
    console.log('** %% item ' +item);
    console.log('***********%%% final submit '+ sessionStorage.getItem('finalsubmit'));
    this.router.navigate(['/registrationdetails/'+item]);


  }



}




