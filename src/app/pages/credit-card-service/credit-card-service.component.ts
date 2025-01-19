import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-card-service',
  templateUrl: './credit-card-service.component.html',
  styleUrls: ['./credit-card-service.component.css']
})
export class CreditCardServiceComponent {

  constructor(private router: Router) {}

  // Function to handle card application click
  applyNow() {
    const isLoggedIn = localStorage.getItem('accessToken');  // Or use a service to check login status

    if (isLoggedIn) {
      // If user is logged in, navigate to the application form
      this.router.navigate(['/credit-card-application']);
    } else {
      // If not logged in, navigate to the login page
      this.router.navigate(['/login']);
    }
  }
}
