import { inject, Injectable } from '@angular/core';
import { PaginatedResponse } from '../models/response.model';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  router = inject(Router);
  route = inject(ActivatedRoute);

  updateQueryParams(currentPage: number, searchQuery: string): void {
    const queryParams: any = {};

    if (currentPage !== 1) {
      queryParams['page'] = currentPage;
    }

    if (searchQuery !== '') {
      queryParams['search'] = searchQuery;
    }

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }
}
