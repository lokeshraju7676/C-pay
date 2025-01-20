import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice.service';
import { CreditCardApplicationService } from 'src/app/services/credit-card-application.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  orderTrackingList: any[] = []; // Holds the list of orders with their details
  applicationDetails: any = null; // Holds the application details fetched
  loading: boolean = false; // Tracks the loading state
  errorMessage: string = ''; // Stores error message for UI display
  searchQuery: string = ''; // Holds the search query entered by the user
  showOrderDetails: boolean = true; // Flag to control whether to show order details or application details

  adminName =localStorage.getItem('username');
  currentTime: string = '';
  dailyQuote: string = 'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill';



  constructor(private authService: AuthService,private router: Router,  private orderTrackingService: CreditCardApplicationService) {}

  ngOnInit(): void {
    this.adminName = this.authService.getAdminName();  // Get the name of the logged-in user
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Update time every second
  }


  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); // Get current time in HH:MM:SS format
  }

  customerList:any=[];
  goToCustomerDetails() {
    this.router.navigate(['/customerdetails']);
  }

  // Method to navigate to the Track Order page
  goToTrackOrder(): void {
    this.router.navigate(['/ordertrackingdetails']); // Replace '/track-order' with the actual route if different
  }

  goToCreditCardApplications(){
    this.router.navigate(['/creditcardapplications']);
  }
  

}
