import { Component } from '@angular/core';
import { CreditCardApplicationService } from '../services/credit-card-application.service';

@Component({
  selector: 'app-ordertracking',
  templateUrl: './ordertracking.component.html',
  styleUrls: ['./ordertracking.component.css']
})
export class OrderTrackingComponent {
  orderId: number | null = null;  // Change to number or null
  orderStatus: string | null = null;
  errorMessage: string | null = null;

  constructor(private creditCardApplicationService: CreditCardApplicationService) {}

  onTrackOrder(): void {
    this.errorMessage = null;  // Reset error message
    this.orderStatus = null;   // Reset order status

    if (this.orderId === null || isNaN(this.orderId)) {
      this.errorMessage = 'Please enter a valid Application ID to track your order.';
      return;
    }

    this.creditCardApplicationService.trackOrder(this.orderId).subscribe(
      (response) => {
        this.orderStatus = `Order Status: ${response.orderStatus}`;
      },
      (error) => {
        this.errorMessage = 'Error fetching order details. Please try again.';
      }
    );
  }
}
