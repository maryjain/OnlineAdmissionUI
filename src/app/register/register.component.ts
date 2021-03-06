import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public title = 'Hello';
  registrationForm =new FormGroup({
    studentName: new FormControl('Test'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    email: new FormControl('')
  });
  constructor() { }

  ngOnInit(): void {
  }

}
