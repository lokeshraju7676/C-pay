import { Component } from '@angular/core';
import { CreditCardApplicationService } from 'src/app/services/credit-card-application.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent {
  orderId: string = '';                // Store the entered Order ID
  orderDetails: any = null;            // Store order details fetched from the backend
  currentStep: number = 0;             // Track the current progress step (out of 4)

  // Mapping of backend order status to user-friendly display names
  orderStatusDisplayNames: { [key: string]: string } = {
    'DISPATCHED': 'Dispatched',
    'IN_TRANSIT': 'In Transit',
    'DELIVERED': 'Delivered',
    'CANCELLED': 'Cancelled',
    'PENDING': 'Pending'
  };

  constructor(private creditCardService: CreditCardApplicationService) { }

  // Function to fetch order details from the backend
  fetchOrderDetails() {
    if (!this.orderId) {
      alert('Please enter a valid Order ID!');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('You are not logged in. Please login to track your order.');
      return;
    }

    this.creditCardService.trackOrder(this.orderId).subscribe({
      next: (response) => {
        console.log('Order details:', response);  // Debugging to check response
        this.orderDetails = response;
        this.currentStep = this.getStepFromStatus(response.orderStatus);
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
        if (error.status === 401) {
          alert('Unauthorized! Please login to track your order.');
        } else if (error.status === 404) {
          alert('Order not found! Please check the Order ID.');
        } else {
          alert('An error occurred while fetching the order details.');
        }
      }
    });
  }

  // Helper function to convert order status to progress step
  getStepFromStatus(status: string): number {
    const stepMapping: { [key: string]: number } = {
      'PENDING': 1,
      'DISPATCHED': 2,
      'IN_TRANSIT': 3,
      'DELIVERED': 4,
      'CANCELLED': 0
    };

    return stepMapping[status] || 0;  // Default to step 0 if status is not recognized
  }

  // Function to get the display name of the order status
  getOrderStatusDisplayName(status: string): string {
    return this.orderStatusDisplayNames[status] || status; // Fallback to status if not mapped
  }
}
