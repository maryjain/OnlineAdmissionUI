import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminhomeService } from './service/adminhome.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {
  isLoading = false;
  deptuserid:any;
  deptusername:any;
  deptname:any;
  loggedIn:boolean;

  constructor(private router: Router){}
  ngOnInit(): void {
    //this.isLoading = false;
    this.map.set('Application Count', 'homepage');
    this.map.set('Review Applications', 'reviewapplications');

    this.deptuserid = sessionStorage.getItem('deptuserid');
    this.deptusername = sessionStorage.getItem('deptusername');
    this.deptname = sessionStorage.getItem('deptname');
    console.log('************  sessionStorage.getItem(loggedIn) = ' + sessionStorage.getItem('loggedIn'));

    if(sessionStorage.getItem('loggedIn')=== 'true')
    {
      console.log('***********++++admin home true ');
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
   // this.load();
    this.router.navigate(['/adminhome/'+item]);
  }

  public logoutUser():void
  {
    sessionStorage.clear();
  }

}




