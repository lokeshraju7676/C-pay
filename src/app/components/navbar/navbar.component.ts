import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if user is logged in
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout(): void {
    // Clear localStorage and update isLoggedIn status
    localStorage.removeItem('token');
    localStorage.removeItem('userRoles');
    this.isLoggedIn = false;

    // Redirect to login page
    this.router.navigateByUrl('/login');
  }
}
