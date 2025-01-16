import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-services',
  templateUrl: './card-services.component.html',
  styleUrls: ['./card-services.component.css']
})
export class CardServicesComponent {

     private apiUrl = 'http://localhost:8080/api/credit-card';

  constructor(private http: HttpClient) {}

  applyForCreditCard(application: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, application);
  } 
}
