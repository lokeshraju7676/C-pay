import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
 adminName: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.adminName = this.authService.getAdminName();  // Get the name of the logged-in user
  }
  customerList:any=[];
  goToCustomerDetails() {
    this.router.navigate(['/customerdetails']);
  }
}
