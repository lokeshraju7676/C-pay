// src/app/user-details/user-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCardApplicationService } from 'src/app/services/credit-card-application.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: any = null;  // Initially set to null to indicate data is not loaded yet
  isLoading: boolean = true;  // Loading state flag
  errorMessage: string = '';  // For error handling

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private creditCardService: CreditCardApplicationService
  ) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;  // Fetch the user ID from the route

    // Call the service to fetch user details
    this.creditCardService.getUserById(userId).subscribe(
      (data) => {
        this.user = data;  // Assign the fetched data to the user property
        this.isLoading = false;  // Set loading to false once data is loaded
      },
      (error) => {
        this.errorMessage = 'Error fetching user data';  // Set error message if data fetching fails
        this.isLoading = false;  // Set loading to false in case of error
        console.error('Error fetching user data:', error);
      }
    );
  }

  goBackToDashboard() {
    this.router.navigate(['./customerdashboard']);  // Navigate back to the dashboard
  }
}
