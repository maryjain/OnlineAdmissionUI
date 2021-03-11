import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { HomeComponent } from './home/home.component';
import { RegisterhomeComponent } from './register/registerhome.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
          { path: '', redirectTo: 'register',pathMatch:'full' },
          { path: 'register', component: RegisterhomeComponent },
          { path: 'login', component: LoginComponent },
          { path: '**', component: PagenotfoundComponent }


  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

