import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  formSubmitted = false;

  constructor(private router: Router) {}

  // Function to handle form submission
  onSubmit(event: Event) {
    event.preventDefault();  // Prevents the form from submitting and reloading the page

    // Show success message
    this.formSubmitted = true;

    // After 2 seconds, redirect to the home page
    setTimeout(() => {
      this.router.navigate(['/']);  // Navigate to the home page
    }, 2000);  // Redirect after 2 seconds
  }
}
