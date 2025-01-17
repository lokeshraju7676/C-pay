import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CreditCardApplication {
  orderId: number | null;
  id: number;
  applicantName: string;
  applicantEmail: string;
  mobileNumber: string;
  employmentStatus: string;
  annualIncome: number;
  address: string;
  applicationDate: string;
  applicationStatus: string;
  username: string;
}

interface OrderTracking {
  id: number;
  orderStatus: string;
  orderDate: string;
  deliveryDate: string;
  applicationId: number;
}


@Injectable({
  providedIn: 'root'
})
export class CreditCardApplicationService {

  // Hardcoding the API URL directly here
  private apiUrl = 'http://localhost:8080/api/applications';  // Replace with your actual backend URL
  private orderApiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  // Apply for a Credit Card
  applyForCreditCard(application: CreditCardApplication): Observable<CreditCardApplication> {
    return this.http.post<CreditCardApplication>(`${this.apiUrl}/apply`, application);
  }

  // Get Applications by Username
  getApplicationsByUserId(username: string): Observable<CreditCardApplication[]> {
    return this.http.get<CreditCardApplication[]>(`${this.apiUrl}/${username}`);
  }

  // Approve Application
  approveApplication(applicationId: number): Observable<CreditCardApplication> {
    return this.http.post<CreditCardApplication>(`${this.apiUrl}/approve/${applicationId}`, {});
  }

  // Reject Application
  rejectApplication(applicationId: number): Observable<CreditCardApplication> {
    return this.http.post<CreditCardApplication>(`${this.apiUrl}/reject/${applicationId}`, {});
  }


  submitApplication(applicationData: any): Observable<any> {
    return this.http.post(this.apiUrl, applicationData);  // Make the POST request to submit the application
  }

   // Track Order by Application ID
   trackOrder(orderId: string): Observable<any> {
    // Make a GET request to fetch order details by orderId
    return this.http.get<any>(`${this.orderApiUrl}/track/${orderId}`);
  }

}
