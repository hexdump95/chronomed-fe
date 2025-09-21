import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { PaginatedResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  getStaffUsers(search: string = '', page: number = 1): Observable<PaginatedResponse<User>> {
    return this.http.get<PaginatedResponse<User>>(`${environment.apiUrl}/users`,
      {
        params:
          {
            search: search,
            page: page - 1
          }
      }
    );
  }
}
