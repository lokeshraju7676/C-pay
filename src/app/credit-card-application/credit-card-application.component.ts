import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CreditCardApplicationService } from 'src/app/services/credit-card-application.service';

@Component({
  selector: 'app-credit-card-application',
  templateUrl: './credit-card-application.component.html',
  styleUrls: ['./credit-card-application.component.css']
})
export class CreditCardApplicationComponent {
  application = {
    applicantName: '',
    applicantEmail: '',
    mobileNumber: '',
    employmentStatus: '',
    annualIncome: 0, // Default numeric value
    address: '',
    applicationDate: new Date().toISOString(),
    applicationStatus: 'PENDING', // Default value
    username: '',
    orderId: null,  // Add orderId as null
    id: 0           // Add id as 0 (or you can leave it out, if not needed in backend)
  };

  constructor(private creditCardApplicationService: CreditCardApplicationService, private route: Router) {}

  // Function to handle form submission
  submitApplication() {
    if (this.application) {
      // Call the submit method on the service
      this.creditCardApplicationService.submitApplication(this.application).subscribe({
        next: (response) => {
          alert('Application submitted successfully!');
          this.route.navigate(['/home']);
          console.log(response);
        },
        error: (error) => {
          alert('There was an error submitting the application!');
          console.error(error);
        }
      });
    }
  }
}
