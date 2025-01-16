import { Component } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent {
  orderId: string = '';
  orderDetails: any = null;
  currentStep: number = 0; // Tracks progress for the 4 steps

  fetchOrderDetails() {
    // Mock data for simplicity
    const mockData = {
      orderId: 'CC123456789',
      cardholderName: 'John Doe',
      orderStatus: 'En Route', // This determines the current step
      estimatedDelivery: 'January 20, 2025',
      trackingNumber: 'TRK567891011'
    };

    // Map orderStatus to steps
    const stepMapping: { [key: string]: number } = {
      'Processed': 1,
      'Shipped': 2,
      'En Route': 3,
      'Arrival': 4
    };

    if (this.orderId === mockData.orderId) {
      this.orderDetails = {
        orderId: mockData.orderId,
        cardholderName: mockData.cardholderName,
        orderStatus: mockData.orderStatus,
        estimatedDelivery: mockData.estimatedDelivery,
        trackingNumber: mockData.trackingNumber
      };
      // Set the currentStep based on orderStatus
      this.currentStep = stepMapping[mockData.orderStatus] || 0;
    } else {
      alert('Order ID not found!');
      this.orderDetails = null;
      this.currentStep = 0;
    }
  }
}
