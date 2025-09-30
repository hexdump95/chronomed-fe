import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaymentType } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/payments`;

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(`${this.apiUrl}/types`);
  }

  patchPaymentTypeActive(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/types/${id}`, null);
  }

}
