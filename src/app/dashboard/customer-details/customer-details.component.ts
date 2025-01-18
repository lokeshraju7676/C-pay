import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCardApplicationService } from 'src/app/services/credit-card-application.service';

// Define a Customer interface matching backend fields
export interface Customer {
  id: number;
  username: string;
  email: string;
  mobile: string;
  gender: string;
  address: string;
}

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerList: Customer[] = [];
  editingCustomer: Customer | null = null;
  deletingCustomer: Customer | null = null; // Holds customer for delete confirmation

  constructor(private router: Router, private creditCardService: CreditCardApplicationService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  goBackToDashboard() {
    this.router.navigate(['/admindashboard']);
  }

  getAllCustomers(): void {
    this.creditCardService.getAllUsers().subscribe(
      (data: any[]) => {
        this.customerList = data.map(customer => ({
          id: customer.id,
          username: customer.username,
          email: customer.email,
          mobile: customer.mobile,
          gender: customer.gender,
          address: customer.address
        }));
      },
      (error) => console.error('Error fetching customers', error)
    );
  }

  viewCustomer(id: number): void {
    this.router.navigate(['/userdetails', id]);
  }

  editCustomer(customer: Customer): void {
    this.editingCustomer = { ...customer };
  }

  updateCustomer(): void {
    if (this.editingCustomer) {
      this.creditCardService.updateUser(this.editingCustomer.id, this.editingCustomer).subscribe(
        () => {
          alert('Customer updated successfully!');
          this.editingCustomer = null;
          this.getAllCustomers();
        },
        (error) => console.error('Error updating customer', error)
      );
    }
  }

  cancelEdit(): void {
    this.editingCustomer = null;
  }

  confirmDelete(customer: Customer): void {
    this.deletingCustomer = customer;
  }

  deleteCustomer(id: number): void {
    this.creditCardService.deleteUser(id).subscribe(
      () => {
        alert('Customer deleted successfully');
        this.customerList = this.customerList.filter(c => c.id !== id); // Remove deleted customer
        this.deletingCustomer = null;
      },
      (error) => console.error('Error deleting customer', error)
    );
  }

  cancelDelete(): void {
    this.deletingCustomer = null;
  }
}
