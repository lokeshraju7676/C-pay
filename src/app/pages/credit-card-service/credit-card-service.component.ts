import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-credit-card-services',
  templateUrl: './credit-card-service.component.html',
  styleUrls: ['./credit-card-service.component.css']
})
export class CreditCardServicesComponent {

  /* private apiUrl = 'http://localhost:8080/api/credit-card';

  constructor(private http: HttpClient) {}

  applyForCreditCard(application: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, application);
  } */
}
