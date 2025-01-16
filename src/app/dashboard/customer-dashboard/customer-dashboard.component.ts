import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authservice.service';
 // Import AuthService to get the admin's name

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  adminName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.adminName = this.authService.getAdminName();  // Get the name of the logged-in user
  }
  
}
