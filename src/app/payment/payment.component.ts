  /* import { Component } from '@angular/core';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
  })
  export class PaymentComponent {
    cardNumber: string = '';
    expirationDate: string = '';
    cvv: string = '';
    cardholderName: string = '';
    message: string = '';

    constructor(private router: Router) {}

    confirmPayment() {
      if (this.validateCardDetails()) {
        this.router.navigate(['/payment-success']);
      } else {
        this.message = 'Invalid CVV, Expiration Date, or Card Number';
      }
    }

    private validateCardDetails(): boolean {
      const hardcodedCard = {
        cardNumber: '4000123456789010', // No spaces
        expirationDate: '12/26',
        cvv: '123',
        cardholderName: 'Lokesh Raju'
      };

      
      const sanitizedCardNumber = this.cardNumber.replace(/\s/g, '');

      return (
        sanitizedCardNumber === hardcodedCard.cardNumber &&
        this.expirationDate.trim() === hardcodedCard.expirationDate &&
        this.cvv.trim() === hardcodedCard.cvv &&
        this.cardholderName.trim().toLowerCase() === hardcodedCard.cardholderName.toLowerCase()
      );
    }

    goToHome() {
      this.router.navigate(['/']);
    }
  }
  */




  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { AuthService } from '../authservice.service';

  @Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
  })
  export class PaymentComponent {
    cardNumber: string = '';
    expirationDate: string = '';
    cvv: string = '';
    cardholderName: string = ''; 
    message: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    confirmPayment() {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
        return;
      }

      this.authService.getCardDetails(this.cardNumber).subscribe({
        next: (response) => {
          if (this.validateCardDetails(response)) {
            this.router.navigate(['/payment-success']);
          } else {
            this.message = 'Invalid CVV, Expiration Date, or Card Number';
          }
        },
        error: (error) => {
          if (error.status === 404) {
            this.message = 'Card Number not found';
          } else {
            this.message = 'An error occurred, please try again later';
          }
        }
      });
    }

    /**
     * Validate card details against response from backend
     */
    private validateCardDetails(card: any): boolean {
      return (
        card &&
        card.cardNumber.replace(/\s/g, '') === this.cardNumber.replace(/\s/g, '')
        /* card.expirationDate === this.expirationDate &&
        card.cvv === this.cvv &&
        card.cardholderName === this.cardholderName
  */    );
    }

    goToHome() {
      this.router.navigate(['/']);
    }
  }
