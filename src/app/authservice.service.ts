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
}