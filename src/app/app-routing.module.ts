import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { adminGuard } from './guards/admin-guard.guard';
import { CardServicesComponent } from './pages/card-services/card-services.component';
import { CreditCardApplicationComponent } from './credit-card-application/credit-card-application.component';
import { OrderTrackingComponent } from './ordertracking/ordertracking.component';
import { CustomerDashboardComponent } from './dashboard/customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { CustomerDetailsComponent } from './dashboard/customer-details/customer-details.component';
import { UserDetailsComponent } from './dashboard/user-details/user-details.component';
import { RewardsComponent } from './dashboard/rewards/rewards.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route redirects to 'home'
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admindashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'card-services', component: CardServicesComponent },
  {path : 'credit-card-application', component:CreditCardApplicationComponent},
  { path: 'ordertracking', component: OrderTrackingComponent },
  {path:'customerdashboard', component: CustomerDashboardComponent },
  {path:'customerdetails', component: CustomerDetailsComponent},
  {path: 'userdetails', component: UserDetailsComponent},
  {path:'rewards', component:RewardsComponent},
  { path: '**', redirectTo: 'home' },  // Wildcard route to handle unmatched URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
