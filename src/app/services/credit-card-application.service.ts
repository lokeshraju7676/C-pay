import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, of } from 'rxjs';

// Define types for CreditCardApplication and OrderTracking
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
  private apiUrl = 'http://localhost:8080/api/applications';  // API URL for applications
  private orderApiUrl = 'http://localhost:8080/api/orders';   // API URL for order tracking
  private userApiUrl = 'http://localhost:8080/api/users';     // API URL for users

  constructor(private http: HttpClient) { }

  // Apply for a Credit Card (No token needed here)
  applyForCreditCard(application: CreditCardApplication): Observable<CreditCardApplication> {
    return this.http.post<CreditCardApplication>(`${this.apiUrl}/apply`, application);
  }

  // Get Applications by UserId (No token needed here)
  getApplicationsByUserId(username: string): Observable<CreditCardApplication[]> {
    return this.http.get<CreditCardApplication[]>(`${this.apiUrl}/${username}`);
  }

  // Get all applications (Admin)
  getAllApplications(): Observable<CreditCardApplication[]> {
    return this.http.get<CreditCardApplication[]>(`${this.apiUrl}/all`);
  }

  // Approve Application (No token needed here)
  approveApplication(applicationId: number): Observable<CreditCardApplication> {
    return this.http.post<CreditCardApplication>(`${this.apiUrl}/approve/${applicationId}`, {}).pipe(
      // After the application is approved, update the order status
      switchMap((application: CreditCardApplication) => {
        if (application.orderId) {
          // If the application has an orderId, update the corresponding order status
          return this.updateOrderStatus(application.orderId, 'Approved');
        } else {
          return of(null); // If no orderId, return an observable with null
        }
      })
    );
  }

  // Reject Application (No token needed here)
  rejectApplication(applicationId: number): Observable<CreditCardApplication> {
    return this.http.post<CreditCardApplication>(`${this.apiUrl}/reject/${applicationId}`, {}).pipe(
      // After the application is rejected, update the order status
      switchMap((application: CreditCardApplication) => {
        if (application.orderId) {
          // If the application has an orderId, update the corresponding order status
          return this.updateOrderStatus(application.orderId, 'Rejected');
        } else {
          return of(null); // If no orderId, return an observable with null
        }
      })
    );
  }

  // Submit Application (Token-based request)
  submitApplication(applicationData: any): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    if (!token) {
      console.error('No access token found');
      throw new Error('No access token found');
    }

    // Set the Authorization header with the Bearer token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/apply`, applicationData, { headers });
  }

  // Track Order (Admin only)
  trackOrder(orderId: string): Observable<OrderTracking> {
    return this.http.get<OrderTracking>(`${this.orderApiUrl}/track/${orderId}`);
  }

  // Get all users (Admin only)
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.userApiUrl}/all`);
  }

  // Get a user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.userApiUrl}/${id}`, {responseType:'text'});
  }

  // Get a user by username
  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.userApiUrl}/username/${username}`);
  }

  // Update user details
  updateUser(id: number, userDetails: any): Observable<any> {
    return this.http.put(`${this.userApiUrl}/${id}`, userDetails);
  }

  // Delete a user (Admin only)
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.userApiUrl}/${id}`);
  }

  // Update the role of a user (Admin only)
  updateRole(id: number, role: string): Observable<any> {
    return this.http.put(`/api/customers/${id}/role`, { role });
  }

  // New method to fetch all orders and combine with application details for the admin dashboard
  getAllOrdersWithApplicationDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderApiUrl}/allOrdersWithApplications`);
  }

  // Fetch the order tracking details for the given orderId
  getOrderTrackingDetails(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.orderApiUrl}/track/${orderId}`);
  }

  getApplicationDetailsByOrderId(orderId: string): Observable<any> {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('accessToken'); 
    if (!token) {
      console.error('No access token found');
      throw new Error('No access token found');
    }
  
    // Set the Authorization header with the Bearer token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Send the GET request with the Authorization header
    return this.http.get<any>(`${this.apiUrl}/details/${orderId}`, { headers });
  }
  
  // Fetch all orders and their corresponding applications (Admin only)
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderApiUrl}/allOrders`);
  }

  // Fetch the order tracking details by applicationId
  getOrderTrackingByApplicationId(applicationId: number): Observable<OrderTracking> {
    return this.http.get<OrderTracking>(`${this.orderApiUrl}/byApplicationId/${applicationId}`);
  }

  // Update order status based on application status
  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.orderApiUrl}/updateStatus/${orderId}`, { status });
  }

  // Get application details by applicationId
  getApplicationById(applicationId: number): Observable<CreditCardApplication> {
    return this.http.get<CreditCardApplication>(`${this.apiUrl}/applicationId/${applicationId}`);
  }

// Fetch all credit card applications
getAllCreditCardApplications(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/all`); // Make sure this is the correct backend URL
}

// Method to delete a credit card application
deleteCreditCardApplication(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
}

updateCreditCardApplication(id: number, application: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, application);
}
  
}
