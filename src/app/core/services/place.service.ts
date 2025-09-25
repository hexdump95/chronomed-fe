import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { District, Locality, Province } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/places`;


  getAllProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.apiUrl}/provinces/all`);
  }

  getAllDistrictsByProvinceId(provinceId: number): Observable<District[]> {
    return this.http.get<District[]>(`${this.apiUrl}/provinces/${provinceId}/districts/all`);
  }

  getAllLocalitiesByDistrictId(districtId: number): Observable<Locality[]> {
    return this.http.get<Locality[]>(`${this.apiUrl}/provinces/districts/${districtId}/localities/all`);
  }

  getLocality(id: number): Observable<Locality> {
    return this.http.get<Locality>(`${this.apiUrl}/provinces/districts/localities/${id}`);
  }

}
