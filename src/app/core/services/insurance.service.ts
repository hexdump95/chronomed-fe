import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Insurance, InsuranceCoverage } from '../models/insurance.model';
import { PaginatedResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/insurances`;


  getInsurances(search: string = '', page: number = 1): Observable<PaginatedResponse<Insurance>> {
    return this.http.get<PaginatedResponse<Insurance>>(`${this.apiUrl}`,
      {
        params:
          {
            search: search,
            page: page - 1
          }
      }
    );
  }

  getAllInsurances(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${this.apiUrl}/all`);
  }

  getInsurance(id: number): Observable<Insurance> {
    return this.http.get<Insurance>(`${this.apiUrl}/${id}`);
  }

  createInsurance(request: Insurance): Observable<Insurance> {
    return this.http.post<Insurance>(`${this.apiUrl}`, request);
  }

  updateInsurance(id: number, request: Insurance): Observable<Insurance> {
    return this.http.put<Insurance>(`${this.apiUrl}/${id}`, request);
  }

  deleteInsurance(id: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${id}`);
  }

  createCoverage(insuranceId: number, request: InsuranceCoverage): Observable<InsuranceCoverage> {
    return this.http.post<InsuranceCoverage>(`${this.apiUrl}/${insuranceId}/coverages`, request);
  }

}
