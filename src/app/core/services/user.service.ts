import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role, User } from '../models/user.model';
import { PaginatedResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/users`;

  getStaffUsers(search: string = '', page: number = 1): Observable<PaginatedResponse<User>> {
    return this.http.get<PaginatedResponse<User>>(`${this.apiUrl}`,
      {
        params:
          {
            search: search,
            page: page - 1
          }
      }
    );
  }

  getStaffUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles/all`);
  }

  createUser(request: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, request);
  }

  updateUser(id: string, request: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, request);
  }
}
