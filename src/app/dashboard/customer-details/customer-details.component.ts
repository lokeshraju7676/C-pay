import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customerList = [
    { id: 1, name: 'John Doe', status: 'Active' },
    { id: 2, name: 'Jane Smith', status: 'Active' },
    { id: 3, name: 'Mike Johnson', status: 'Active' },
    // Add more customers if necessary
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // You can fetch the customer list here from an API if needed
  }
  goBackToDashboard(){
    this.router.navigate(['/admindashboard']);
  }
  blockCustomer(id: number): void {
    const customer = this.customerList.find(cust => cust.id === id);
    if (customer) {
      customer.status = 'Blocked'; // Block the customer (you can modify this logic)
    }
  }
}
