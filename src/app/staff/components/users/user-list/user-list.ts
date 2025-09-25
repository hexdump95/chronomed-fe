import { Component, inject } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { NgStyle } from '@angular/common';
import { PaginatedResponse } from '../../../../core/models/response.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PaginationService } from '../../../../core/services/pagination.service';
import { Pagination } from '../../../../shared/ui/pagination/pagination';

@Component({
  selector: 'app-user-list',
  imports: [
    NgStyle,
    ReactiveFormsModule,
    RouterLink,
    Pagination,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginationService = inject(PaginationService);

  paginatedResponse!: PaginatedResponse<User>;
  searchQueryControl: FormControl<string> = new FormControl(this.route.snapshot.queryParams['search'] === undefined ? '' : this.route.snapshot.queryParams['search'].toString());
  currentPage: number = this.route.snapshot.queryParams['page'] === undefined ? 1 : parseInt(this.route.snapshot.queryParams['page']);
  pageSize: number = 10;

  ngOnInit() {
    this.goToPage(this.currentPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.userService.getStaffUsers(this.searchQueryControl.value, page)
      .subscribe(paginatedResponse => {
        this.paginatedResponse = paginatedResponse;
        this.paginationService.updateQueryParams(this.currentPage, this.searchQueryControl.value);
      });
  }

  filterPage() {
    this.goToPage(1);
  }

  onPageChanged(page: number) {
    this.goToPage(page);
  }
}
