import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Facility } from '../models/facility.model';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/facilities`;

  getAllFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${this.apiUrl}/all`);
  }

}
