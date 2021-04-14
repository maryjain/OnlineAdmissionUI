import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../login/service/login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public loginsrv: LoginService) { }

  ngOnInit() {

  }

  onResize(event) {


  }

}
