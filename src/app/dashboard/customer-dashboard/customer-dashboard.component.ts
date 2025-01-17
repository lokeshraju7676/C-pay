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
goRewards() {
this.router.navigate(['./rewards']);
}
  constructor(private authService: AuthService,private router: Router) {}
goDetails() {
this.router.navigate(['./userdetails']);
}
  adminName: string = '';

  

  ngOnInit(): void {
    this.adminName = this.authService.getAdminName();  // Get the name of the logged-in user
  }
  
}
