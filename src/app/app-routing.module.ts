import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { HomeComponent } from './home/home.component';
import { RegisterhomeComponent } from './register/registerhome.component';
import { LoginComponent } from './login/login.component';
import { RegistrationdetailsComponent } from './registrationdetails/registrationdetails.component';
import { ProfiledetailsComponent } from './registrationdetails/profiledetails/profiledetails.component';
import { EducationqualificationComponent } from './registrationdetails/educationqualification/educationqualification.component';
import { UploaddocumentsComponent } from './registrationdetails/uploaddocuments/uploaddocuments.component';
import { ProfilesummaryComponent } from './profilesummary/profilesummary.component';
const routes: Routes = [
          { path: '', redirectTo: 'register', pathMatch:'full' },
          { path: 'register', component: RegisterhomeComponent },
          { path: 'login', component: LoginComponent },
          { path: 'registrationdetails', component: RegistrationdetailsComponent, children: [
            { path: '', redirectTo: 'profiledetails', pathMatch: 'full' },
            { path: 'profiledetails', component:  ProfiledetailsComponent },
            { path: 'uploaddocuments', component: UploaddocumentsComponent },
            { path: 'profilesummary', component: ProfilesummaryComponent }

        ] },
        { path: '**', component: PagenotfoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

