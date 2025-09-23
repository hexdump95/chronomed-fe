import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Specialty } from '../models/specialty.model';
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

}
