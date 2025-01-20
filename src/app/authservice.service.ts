import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';  // Import map from rxjs/operators


interface LoginResponse {
  accessToken: string;
  username: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Adjust the URL as needed
  private payurl='http://localhost:8080/api/carddetails';

  constructor(private http: HttpClient) {}

  // Login method with username and password
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/signin`, { username, password })
      .pipe(
        map((response: LoginResponse) => {
          localStorage.setItem('accessToken', response.accessToken);  // Store token
          localStorage.setItem('username', response.username);         // Store admin's name
          localStorage.setItem('roles', JSON.stringify(response.roles)); // Store roles if applicable
          return response;
        })
      );
  }

  // Register method
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');  // Remove admin's name
    localStorage.removeItem('roles');     // Optionally remove roles
  }

  // Get the admin's name from local storage
  getAdminName(): string {
    return localStorage.getItem('username') || 'Admin';  // Default to 'Admin' if not found
  }

  // This method assumes the user's name is stored in localStorage
  getUserName(): string {
    return localStorage.getItem('userName') || 'Guest';  // Default to 'Guest' if no name is stored
  }

   // This method can set the user's name when they log in
   setUserName(name: string): void {
    localStorage.setItem('userName', name);
  }


  // Get Authorization headers with Bearer token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Handle HTTP errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }

  // Method to fetch card details (example)
  getCardDetails(cardNumber: string): Observable<any> {
    // Adjust the URL based on your backend API for fetching card details
    return this.http.get<any>(`${this.payurl}/${cardNumber}`, {
      headers: this.getAuthHeaders()  // Add authentication header if required
    });
  }

  // Method to fetch all card details (example)
  getAllCardDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.payurl}/all`, {
      headers: this.getAuthHeaders()  // Add authentication header if required
    });
  }

}