import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-authcodereader',
  templateUrl: './authcodereader.component.html',
  styleUrls: ['./authcodereader.component.scss']
})
export class AuthcodereaderComponent implements OnInit {
  authCode='';
  state= '';
  error= '';
  errorDescription='';
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.authCode = params['code'];
      console.log(' this.authCode ='+ this.authCode);
      this.state = params['state'];
      console.log(' this.state ='+ this.state);
      this.error = params['error'];
      console.log(' this.error ='+ this.error);
      this.errorDescription = params['error_description'];
      console.log(' this.authCode ='+ this.errorDescription);
    });

if(this.error)
{
window.alert('error occured '+this.error+' description '+this.errorDescription);
}
else{
  //let txtState = window.opener.document.getElementById("txtstate");
  //txtState.value =this.state;
  //let txtAuthCode = window.opener.document.getElementById("txtauthcode");
  //txtAuthCode.value =this.authCode;
 // alert("txtAuthCode.value ="+txtAuthCode.value);

 window.opener.postAuthorize(this.state,this.authCode);

}
  window.close();
  }

}
