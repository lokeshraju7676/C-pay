import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { CreditCardApplicationService } from 'src/app/services/credit-card-application.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-order-tracking-details',
  templateUrl: './ordertrackingdetails.component.html',
  styleUrls: ['./ordertrackingdetails.component.css'],
})
export class OrderTrackingDetailsComponent implements OnInit {
  orderTrackingList: any[] = []; // Holds the list of orders with their details
  applicationDetails: any = null; // Holds the application details fetched
  loading: boolean = false; // Tracks the loading state
  errorMessage: string = ''; // Stores error message for UI display
  searchQuery: string = ''; // Holds the search query entered by the user
  showOrderDetails: boolean = true; // Flag to control whether to show order details or application details

  constructor(
    private orderTrackingService: CreditCardApplicationService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.fetchOrderTrackingDetails(); // Fetch all order tracking details when component initializes
  }

  // Fetch all order tracking details
  fetchOrderTrackingDetails(): void {
    this.loading = true; // Start loading
    this.errorMessage = ''; // Clear previous error messages

    // Fetch all order details from the service
    this.orderTrackingService
      .getAllOrdersWithApplicationDetails() // Service call for all order and application details
      .pipe(
        catchError((error) => {
          // Catch any errors and set error message
          this.errorMessage = 'Error fetching order details. Please try again later.';
          this.loading = false; // Stop loading on error
          return of([]); // Return an empty array on error
        })
      )
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.orderTrackingList = data; // Assign fetched order tracking data
        } else {
          this.orderTrackingList = []; // If no data, clear the list
        }
        this.loading = false; // Stop loading after the request
      });
  }

  // Fetch application details based on Order ID
  searchApplicationDetails(): void {
    if (!this.searchQuery) {
      this.errorMessage = 'Please enter a valid Order ID.'; // Ensure a valid order ID is entered
      return;
    }

    this.loading = true;
    this.errorMessage = ''; // Clear any previous errors
    this.showOrderDetails = false; // Hide order details when searching for application details

    // Fetch application details using the search query (Order ID)
    this.orderTrackingService
      .getApplicationDetailsByOrderId(this.searchQuery) // Call the service to get application details
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Error fetching application details. Please try again later.'; // Handle error
          this.loading = false;
          return of(null); // Return null on error
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.applicationDetails = data; // Set the fetched application details
        } else {
          this.errorMessage = 'Application details not found for the given Order ID.'; // No data found
        }
        this.loading = false;
      });
  }

  // Reset to show order details again after viewing application details
  resetView(): void {
    this.showOrderDetails = true;
    this.applicationDetails = null; // Clear application details when resetting view
    this.searchQuery = ''; // Clear search query
    this.errorMessage = ''; // Clear error message
  }

  // Method to navigate back to the dashboard
  navigateToDashboard(): void {
    this.router.navigate(['/admindashboard']); // Navigate to the dashboard route
  }

  // Handle order status change from dropdown
  updateOrderStatus(order: any): void {
    if (!order.orderId || !order.orderStatus) {
      this.errorMessage = 'Invalid order data.';
      return;
    }

    // Call the service to update the order status
    this.orderTrackingService
      .updateOrderStatus(order.orderId, order.orderStatus) // Make the API call to update order status
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Error updating order status. Please try again later.';
          return of(null); // Return null on error
        })
      )
      .subscribe((updatedOrder: any) => {
        if (updatedOrder) {
          this.errorMessage = ''; // Clear error message if the update is successful
          console.log('Order status updated successfully');
        } else {
          this.errorMessage = 'Failed to update order status.'; // If the update failed, show error message
        }
      });
  }

  
}
