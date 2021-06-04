import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../login/service/login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedIn=false;
  constructor(public loginsrv: LoginService) { }

  ngOnInit() {
    this.loggedIn =JSON.parse(sessionStorage.getItem('loggedIn'))===true;

    console.log("______*****_____++++++_______ sessionStorage.getItem('loggedIn') ="+sessionStorage.getItem('loggedIn'));
  }

  onResize(event) {

  }


  public logoutUser():void
  {
     this.loggedIn=false;
    //sessionStorage.clear();
  }

}
