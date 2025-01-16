import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { adminGuard } from './guards/admin-guard.guard';
import { CreditCardApplicationComponent } from './credit-card-application/credit-card-application.component';
import { CustomerDashboardComponent } from './dashboard/customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { CustomerDetailsComponent } from './dashboard/customer-details/customer-details.component';
import { CreditCardServicesComponent } from './pages/credit-card-service/credit-card-service.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route redirects to 'home'
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admindashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  {path : 'credit-card-application', component:CreditCardApplicationComponent},
  {path:'customerdashboard', component: CustomerDashboardComponent },
  {path:'customerdetails', component: CustomerDetailsComponent},
  {path:'credit-card-service', component:CreditCardServicesComponent},
  { path: '**', redirectTo: 'home' },  // Wildcard route to handle unmatched URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
