import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  username: string | null = localStorage.getItem('username');
  isEditing: boolean = false; // Track if the edit form is open

  constructor(
    private router: Router,
    private creditCardService: CreditCardApplicationService
  ) {}

  ngOnInit(): void {
    if (this.username) {
      // Fetch user details by username if available
      this.creditCardService.getUserByUsername(this.username).subscribe(
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
    } else {
      this.errorMessage = 'Username is not available in localStorage';
      this.isLoading = false;
    }
  }

  openEditForm() {
    this.isEditing = true; // Show the edit form
  }

  closeEditForm() {
    this.isEditing = false; // Close the edit form
  }

  saveChanges() {
    if (this.user) {
      const userId = this.user.id; // Assuming `id` is a property in the `user` object
  
      // Call the service to save the updated user data
      this.creditCardService.updateUser(userId, this.user).subscribe(
        (response) => {
          // Handle successful update
          console.log('User updated successfully:', response);
          this.isEditing = false; // Close the edit form
        },
        (error) => {
          console.error('Error updating user data:', error);
        }
      );
    }
  }
  

  goBackToDashboard() {
    this.router.navigate(['./customerdashboard']);  // Navigate back to the dashboard
  }
}
