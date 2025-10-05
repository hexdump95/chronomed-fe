import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DocumentType, PatientProfile, SelfPerceivedIdentity, Sex } from '../models/patient-profile.model';

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
