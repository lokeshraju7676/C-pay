import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(private router: Router) { }
goBackToDashboard() {
this.router.navigate(['./customerdashboard']);
}
  user = {
    id: '12345',
    username: '@john_doe',
    mobile: '+1234567890',
    email: 'john.doe@example.com',
    gender: 'Male',
    address: '123 Main St, City, Country',
  };



  ngOnInit(): void {}
}
