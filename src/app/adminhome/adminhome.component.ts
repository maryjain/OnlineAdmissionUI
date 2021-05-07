import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {

  profileid:any;
  fullname:any;
  loggedIn:boolean;
  constructor(private router: Router){}
  ngOnInit(): void {
    this.map.set('Review Applications', 'reviewapplications');
    this.map.set('Reset Password', 'profiledetails');
    this.profileid = sessionStorage.getItem('profileid');
    this.fullname = sessionStorage.getItem('fullname');
    console.log('************  sessionStorage.getItem(loggedIn) = ' + sessionStorage.getItem('loggedIn'));
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
    this.router.navigate(['/registrationdetails/'+item]);
  }

  public logoutUser():void
  {
    sessionStorage.clear();
  }

}




