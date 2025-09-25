import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Facility, Room } from '../models/facility.model';
import { PaginatedResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/facilities`;


  getFacilities(search: string = '', page: number = 1): Observable<PaginatedResponse<Facility>> {
    return this.http.get<PaginatedResponse<Facility>>(`${this.apiUrl}`,
      {
        params:
          {
            search: search,
            page: page - 1
          }
      }
    );
  }

  getAllFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${this.apiUrl}/all`);
  }

  getFacility(id: number): Observable<Facility> {
    return this.http.get<Facility>(`${this.apiUrl}/${id}`);
  }

  createFacility(request: Facility): Observable<Facility> {
    return this.http.post<Facility>(`${this.apiUrl}`, request);
  }

  updateFacility(id: number, request: Facility): Observable<Facility> {
    return this.http.put<Facility>(`${this.apiUrl}/${id}`, request);
  }

  deleteFacility(id: number): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/${id}`);
  }

  createRoom(facilityId: number, request: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/${facilityId}/rooms`, request);
  }

}
