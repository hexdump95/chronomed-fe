import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StaffProfile } from '../models/staff-profile.model';

@Injectable({
  providedIn: 'root'
})
export class StaffProfileService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/profile`;

  getProfile(): Observable<StaffProfile> {
    return this.http.get<StaffProfile>(`${this.apiUrl}`);
  }

  updateProfile(request: StaffProfile): Observable<StaffProfile> {
    return this.http.put<StaffProfile>(`${this.apiUrl}`, request);
  }

  getInsuranceIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/insurances`);
  }

  updateInsurances(insuranceIds: number[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/insurances`, insuranceIds);
  }

}
