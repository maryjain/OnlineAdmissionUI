import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { HomeComponent } from './home/home.component';
import { RegisterhomeComponent } from './register/registerhome.component';
import { LoginComponent } from './login/login.component';
import { RegistrationdetailsComponent } from './registrationdetails/registrationdetails.component';
import { ProfiledetailsComponent } from './registrationdetails/profiledetails/profiledetails.component';
import { ProfilesummaryComponent } from './registrationdetails/profilesummary/profilesummary.component';
import { PersonalComponent } from './registrationdetails/profilesummary/personal/personal.component';
import { EducationqualificationComponent } from './registrationdetails/profilesummary/educationqualification/educationqualification.component';
import { AddressComponent } from './registrationdetails/profilesummary/address/address.component';
import { PaymentComponent } from './registrationdetails/profilesummary/payment/payment.component';
const routes: Routes = [
          { path: '', redirectTo: 'register', pathMatch:'full' },
          { path: 'register', component: RegisterhomeComponent },
          { path: 'login', component: LoginComponent },
          { path: 'registrationdetails', component: RegistrationdetailsComponent, children: [
            { path: '', redirectTo: 'profiledetails', pathMatch: 'full' },
            { path: 'profiledetails', component:  ProfiledetailsComponent },
            { path: 'profilesummary', component: ProfilesummaryComponent,
            children: [
              { path: 'personal', component: PersonalComponent },
              { path: 'educationqualification', component: EducationqualificationComponent },
              { path: 'address', component: AddressComponent },
              { path: 'payment', component: PaymentComponent },
            ]
          }
        ] },
        { path: '**', component: PagenotfoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

