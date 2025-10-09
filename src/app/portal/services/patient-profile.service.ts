import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  DocumentType,
  Domicile,
  PatientInsurance,
  PatientProfile,
  SelfPerceivedIdentity,
  Sex
} from '../models/patient-profile.model';
import { Insurance } from '../../core/models/insurance.model';

@Injectable({
  providedIn: 'root'
})
export class PatientProfileService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/patient`;

  getProfile(): Observable<PatientProfile> {
    return this.http.get<PatientProfile>(`${this.apiUrl}`);
  }

  updateProfile(request: PatientProfile): Observable<PatientProfile> {
    return this.http.put<PatientProfile>(`${this.apiUrl}`, request);
  }

  getDomicile(): Observable<Domicile> {
    return this.http.get<Domicile>(`${this.apiUrl}/domicile`);
  }

  updateDomicile(request: Domicile): Observable<Domicile> {
    return this.http.put<Domicile>(`${this.apiUrl}/domicile`, request);
  }

  getComorbidities(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/comorbidities`);
  }

  updateComorbidities(comorbidityIds: number[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/comorbidities`, comorbidityIds);
  }

  getInsurances(): Observable<PatientInsurance[]> {
    return this.http.get<PatientInsurance[]>(`${this.apiUrl}/insurances`);
  }

  getSex(): Observable<Sex[]> {
    return this.http.get<Sex[]>(`${this.apiUrl}/sex`);
  }

  getSelfPerceivedIdentities(): Observable<SelfPerceivedIdentity[]> {
    return this.http.get<SelfPerceivedIdentity[]>(`${this.apiUrl}/self-perceived-identities`);
  }

  getDocumentTypes(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(`${this.apiUrl}/document-types`);
  }

}
