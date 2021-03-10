import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterhomeComponent } from './register/registerhome.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
          { path: '', component: RegisterhomeComponent },
          { path: 'register', component: RegisterhomeComponent },
          { path: 'login', component: LoginComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

