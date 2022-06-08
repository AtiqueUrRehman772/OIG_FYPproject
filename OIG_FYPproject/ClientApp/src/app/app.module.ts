import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AdvisorHomePageComponent } from './pages/advisorHomePage/advisorHomePage.component';
import { InvestorHomePageComponent } from './pages/investorHomePage/investorHomePage.component';
import { AdminDashboardComponent } from './pages/adminDashboard/adminDashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FooterComponent } from './pages/footer/footer.component';
import { UserRegisterService } from './pages/services/register/userRegister.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './pages/services/userAuth/auth.guard';
import { BussinessOwnerHomepageComponent } from './pages/bussinessOwnerHomepage/bussinessOwnerHomepage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    AdminDashboardComponent,
    BussinessOwnerHomepageComponent,
    AdvisorHomePageComponent,
    InvestorHomePageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
     RouterModule.forRoot([
       { path: '', component: LoginComponent },
       { path: 'login', component: LoginComponent },
       { path: 'signup', component: SignupComponent },
       { path: 'adminDashboard', canActivate:[AuthGuard], component: AdminDashboardComponent },
       { path: 'bussinessOwnerHomepage', component: BussinessOwnerHomepageComponent },
       { path: 'advisorHomePage', component: AdvisorHomePageComponent },
       { path: 'investorHomePage', component: InvestorHomePageComponent },
       { path: 'profile', component: ProfileComponent },
    ])
  ],
  providers: [UserRegisterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
