import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCardApplicationService } from 'src/app/services/credit-card-application.service';  // Service to communicate with backend

@Component({
  selector: 'app-credit-card-application',
  templateUrl: './credit-card-application.component.html',
  styleUrls: ['./credit-card-application.component.css'],
})
export class CreditCardApplicationComponent implements OnInit {
  applicationForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  orderId: number | null = null;  // Store order ID for tracking

  constructor(
    private fb: FormBuilder,
    private creditCardService: CreditCardApplicationService,  // Inject the service
    private router: Router
  ) {
    this.applicationForm = this.fb.group({
      applicantName: ['', [Validators.required]],
      applicantEmail: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required]],
      employmentStatus: ['', [Validators.required]],
      annualIncome: ['', [Validators.required, Validators.min(1)]],
      address: ['', [Validators.required]],
      applicationDate: [new Date(), [Validators.required]],
      applicationStatus: ['PENDING', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    // Reset success and error messages before submitting
    this.successMessage = '';
    this.errorMessage = '';

    // Check if form is invalid
    if (this.applicationForm.invalid) {
      this.errorMessage = 'Please fill in all the required fields.';
      return;
    }

    // Call the service to store the data in the database
    this.creditCardService.applyForCreditCard(this.applicationForm.value).subscribe({
      next: (response) => {
        console.log('Application submitted successfully', response);
        
        // Retrieve the Order ID from the response
        this.orderId = response.orderId;  // Assuming the response contains the orderId
        
        // Show success message after successful submission
        this.successMessage = 'Card Ordered Successfully! Your application is being processed.';
        
        // After displaying success message, redirect to the home page after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000); // Adjust time as needed
      },
      error: (error) => {
        console.error('Error submitting application', error);
        this.errorMessage = 'There was an error submitting your application. Please try again.';
      }
    });
  }
}
