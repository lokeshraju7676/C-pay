import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authservice.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  notifications: string[] = [
    'Transaction alert: $100 spent at Starbucks.',
    'Your reward points have been updated.',
  ];
  notificationsOpen = false;
  router: any;
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  // Logout method
  logout(): void {
    this.authService.logout();
    this.route.navigate(['home']);
  }

  addNotification(message: string): void {
    this.notifications.push(message);
  }

  clearNotifications(): void {
    this.notifications = [];
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const notificationsBox = document.querySelector('.notifications-box');
    const notificationsCheckbox = document.getElementById('notifications-checkbox');
    if (notificationsBox && !notificationsBox.contains(event.target as Node) && event.target !== notificationsCheckbox) {
      this.notificationsOpen = false;
    }
  }
  goDashboard(){
    this.route.navigate(['./admindashboard']);
    ;
  }

/*   goApplyCreditCard() {
    if (this.route) {
      this.route.navigate(['./creditcardapplication']);
    } else {
      console.error('Router is undefined!');
    }
  } */
}
