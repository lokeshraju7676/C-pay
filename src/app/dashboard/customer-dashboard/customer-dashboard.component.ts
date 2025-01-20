import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice.service';
 // Import AuthService to get the admin's name

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
userName: string | null = null;


goPayment() {
  this.router.navigate(['/payment']);  
}

  constructor(private authService: AuthService,private router: Router) {}
goDetails() {
this.router.navigate(['./userdetails']);
}
  adminName: string = '';

  goRewards() {
    this.router.navigate(['./rewards']);
    }

  ngOnInit(): void {
    this.adminName = this.authService.getAdminName();  
    this.userName = this.authService.getUserName(); 
  }
  

  gotrack(){
    this.router.navigate(['/tracking']);
  }

   // Navigate to the credit card application component
   goApplyCreditCard() {
    this.router.navigate(['/credit-card-application']);  
  }

}
