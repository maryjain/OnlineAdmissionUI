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
import { PreviewdetailsComponent } from './previewdetails/previewdetails.component';
import { AddresspreviewComponent } from './previewdetails/addresspreview/addresspreview.component';
import { PersonalpreviewComponent } from './previewdetails/personalpreview/personalpreview.component';
import { EducationpreviewComponent } from './previewdetails/educationpreview/educationpreview.component';
import { PaymentpreviewComponent } from './previewdetails/paymentpreview/paymentpreview.component';
import { ViewstatusComponent } from './registrationdetails/viewstatus/viewstatus.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ReviewapplicationsComponent } from './adminhome/reviewapplications/reviewapplications.component';
import { LoginadminComponent } from './loginadmin/loginadmin/loginadmin.component';
import { HomepageComponent } from './adminhome/homepage/homepage.component';
import { DocumentspreviewComponent } from './previewdetails/documentspreview/documentspreview.component';
import { AuthcodereaderComponent } from './shared/authcodereader/authcodereader.component';
import { AuthGuard } from './AuthGuard';
import { RegisterComponent } from './register/register.component';
import { ContentComponent } from './register/content.component';

//import { AuthGuard } from './AuthGuard';
const routes: Routes = [
          { path: '', redirectTo: 'content', pathMatch:'full' },
          { path: 'content', component: ContentComponent },
          { path: 'login', component: LoginComponent },
          { path: 'registerhome', component: RegisterhomeComponent },
          { path: 'authcodereader', component: AuthcodereaderComponent },
          { path: 'registrationdetails', component: RegistrationdetailsComponent, children: [
          { path: 'register', component: RegisterComponent },
          { path: 'profiledetails', component:  ProfiledetailsComponent},
          { path: 'viewstatus', component:  ViewstatusComponent},
          { path: 'profilesummary', component: ProfilesummaryComponent,
            children: [
              { path: 'personal', component: PersonalComponent },
              { path: 'educationqualification', component: EducationqualificationComponent },
              { path: 'address', component: AddressComponent },
              { path: 'payment', component: PaymentComponent },
            ]
          },

        ] , canActivate: [AuthGuard]
      },
        { path: 'loginadmin', component: LoginadminComponent },
        { path: 'adminhome', component: AdminhomeComponent,
        children: [
          { path: 'reviewapplications', component: ReviewapplicationsComponent },
          { path: 'reviewapplications/:id', component: ReviewapplicationsComponent},
          { path: 'homepage', component: HomepageComponent },
        ],// canActivate: [AuthGuard]
        },

        { path: 'previewdetails/:id', component: PreviewdetailsComponent, canActivate: [AuthGuard]
      },
        { path: 'personalpreview/:id', component: PersonalpreviewComponent , canActivate: [AuthGuard]
      },
        { path: 'educationpreview', component: EducationpreviewComponent , canActivate: [AuthGuard]
      },
        { path: 'addresspreview', component: AddresspreviewComponent ,canActivate: [AuthGuard]
      },
        { path: 'paymentpreview', component: PaymentpreviewComponent , canActivate: [AuthGuard]
      },
        { path: 'documentspreview', component: DocumentspreviewComponent , canActivate: [AuthGuard]
      },
        { path: '**', component: PagenotfoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

