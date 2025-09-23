import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Specialty, SpecialtyPrice } from '../models/specialty.model';
import { PaginatedResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/specialties`;


  getSpecialties(search: string = '', page: number = 1): Observable<PaginatedResponse<Specialty>> {
    return this.http.get<PaginatedResponse<Specialty>>(`${this.apiUrl}`,
      {
        params:
          {
            search: search,
            page: page - 1
          }
      }
    );
  }

  getAllSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.apiUrl}/all`);
  }

  getSpecialty(id: number): Observable<Specialty> {
    return this.http.get<Specialty>(`${this.apiUrl}/${id}`);
  }

  createSpecialty(request: Specialty): Observable<Specialty> {
    return this.http.post<Specialty>(`${this.apiUrl}`, request);
  }

  updateSpecialty(id: number, request: Specialty): Observable<Specialty> {
    return this.http.put<Specialty>(`${this.apiUrl}/${id}`, request);
  }

  deleteSpecialty(id: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${id}`);
  }

  createSpecialtyPrice(specialtyId: number, request: SpecialtyPrice): Observable<SpecialtyPrice> {
    return this.http.post<SpecialtyPrice>(`${this.apiUrl}/${specialtyId}/prices`, request);
  }

}
