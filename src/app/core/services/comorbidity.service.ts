import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/response.model';
import { Comorbidity } from '../models/comorbidity.model';

@Injectable({
  providedIn: 'root'
})
export class ComorbidityService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/comorbidities`;


  getComorbidities(search: string = '', page: number = 1): Observable<PaginatedResponse<Comorbidity>> {
    return this.http.get<PaginatedResponse<Comorbidity>>(`${this.apiUrl}`,
      {
        params:
          {
            search: search,
            page: page - 1
          }
      }
    );
  }

  getAllComorbidities(): Observable<Comorbidity[]> {
    return this.http.get<Comorbidity[]>(`${this.apiUrl}/all`);
  }

  getComorbidity(id: number): Observable<Comorbidity> {
    return this.http.get<Comorbidity>(`${this.apiUrl}/${id}`);
  }

  createComorbidity(request: Comorbidity): Observable<Comorbidity> {
    return this.http.post<Comorbidity>(`${this.apiUrl}`, request);
  }

  updateComorbidity(id: number, request: Comorbidity): Observable<Comorbidity> {
    return this.http.put<Comorbidity>(`${this.apiUrl}/${id}`, request);
  }

  deleteComorbidity(id: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${id}`);
  }

}
