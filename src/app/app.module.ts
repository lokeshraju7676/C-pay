import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';  // If using material input fields

// Angular forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components (Pages and others)
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

// Router module
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { CreditCardApplicationComponent } from './credit-card-application/credit-card-application.component';
import { CustomerDashboardComponent } from './dashboard/customer-dashboard/customer-dashboard.component';
import { CustomerNavbarComponent } from './dashboard/customer-navbar/customer-navbar.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { CustomerDetailsComponent } from './dashboard/customer-details/customer-details.component';
import { UserDetailsComponent } from './dashboard/user-details/user-details.component';
import { RewardsComponent } from './dashboard/rewards/rewards.component';
import { CreditCardServiceComponent } from './pages/credit-card-service/credit-card-service.component';
import { TrackingComponent } from './order-tracking/tracking/tracking.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    CreditCardApplicationComponent,
    TrackingComponent,
    CustomerDashboardComponent,
    CustomerNavbarComponent,
    AdminDashboardComponent,
    CustomerDetailsComponent,
    UserDetailsComponent,
    RewardsComponent,
    CreditCardServiceComponent,
  ],
  imports: [
    BrowserModule,  // Includes CommonModule
    HttpClientModule,  // HTTP client for API calls
    FormsModule,       // Template-driven forms
    ReactiveFormsModule,  // Reactive forms support
    AppRoutingModule,   // Handles routing/navigation in your app
    BrowserAnimationsModule,  // For Angular Material animations
    MatMenuModule,      // Angular Material menu
    MatButtonModule,    // Angular Material button
    MatInputModule,     // Material input fields
    RouterModule,       // Allows routing inside your app
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
