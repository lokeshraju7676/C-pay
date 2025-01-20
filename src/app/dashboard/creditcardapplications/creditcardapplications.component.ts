import { Component, OnInit } from '@angular/core';
import { CreditCardApplicationService } from 'src/app/services/credit-card-application.service';  // Ensure this path is correct
import { Router } from '@angular/router'; // For navigation

@Component({
  selector: 'app-creditcardapplications',
  templateUrl: './creditcardapplications.component.html',
  styleUrls: ['./creditcardapplications.component.css']
})
export class CreditcardapplicationsComponent implements OnInit {

  loading: boolean = false; // To track loading state
  errorMessage: string = ''; // To hold any error messages
  creditCardApplications: any[] = []; // To hold the fetched credit card applications
  isEditing: boolean = false; // To track if the component is in edit mode
  editingApplication: any = null; // The application being edited
  isConfirmDelete: boolean = false; // To manage delete confirmation modal visibility

  constructor(
    private creditCardApplicationService: CreditCardApplicationService, // Service to fetch data
    private router: Router // To navigate to the edit page
  ) {}

  // Fetch all credit card applications when the component initializes
  ngOnInit(): void {
    this.fetchCreditCardApplications();
  }

  // Method to fetch all credit card applications
  fetchCreditCardApplications(): void {
    this.loading = true; // Start loading
    this.errorMessage = ''; // Reset any previous error messages

    this.creditCardApplicationService.getAllCreditCardApplications().subscribe(
      (data: any[]) => {
        this.creditCardApplications = data; // Store the fetched data
        this.loading = false; // Stop loading
      },
      (error: any) => {
        this.errorMessage = 'Error fetching credit card applications. Please try again later.'; // Handle error
        this.loading = false; // Stop loading
      }
    );
  }

  // Start editing an application (clone the data to editingApplication)
  startEditing(application: any): void {
    this.editingApplication = { ...application }; // Clone the application for editing
    this.isEditing = true;
  }

  // Cancel the editing (clear the editingApplication data and reset isEditing flag)
  cancelEdit(): void {
    this.isEditing = false;
    this.editingApplication = null;
  }

  // Save the changes to the application
  saveChanges(): void {
    if (this.editingApplication) {
      this.creditCardApplicationService.updateCreditCardApplication(this.editingApplication.id, this.editingApplication).subscribe(
        (updatedApplication) => {
          // Update the list of applications with the updated application
          const index = this.creditCardApplications.findIndex(app => app.id === updatedApplication.id);
          if (index > -1) {
            this.creditCardApplications[index] = updatedApplication;
          }
          this.cancelEdit(); // Exit edit mode after saving
        },
        (error) => {
          this.errorMessage = 'Error saving changes. Please try again later.';
        }
      );
    }
  }

  // Method to delete a credit card application
  deleteCreditCardApplication(applicationId: number): void {
    this.creditCardApplicationService.deleteCreditCardApplication(applicationId).subscribe(
      () => {
        // Successfully deleted, now remove the application from the list
        this.creditCardApplications = this.creditCardApplications.filter(app => app.id !== applicationId);
        this.cancelDelete(); // Close the delete confirmation modal
      },
      (error: any) => {
        this.errorMessage = 'Error deleting the application. Please try again later.';
      }
    );
  }

  // Go back to Admin Dashboard
  goBack(): void {
    this.router.navigate(['/admindashboard']); // Route to Admin Dashboard
  }

  // Trigger the delete confirmation modal
  confirmDelete(application: any): void {
    this.isConfirmDelete = true;
    this.editingApplication = application; // Keep track of the application to be deleted
  }

  // Cancel delete and close the confirmation modal
  cancelDelete(): void {
    this.isConfirmDelete = false;
    this.editingApplication = null;
  }

  // Delete the application
  deleteApplication(): void {
    if (this.editingApplication) {
      this.deleteCreditCardApplication(this.editingApplication.id); // Call the delete function with the selected application ID
    }
  }
}
