import { Component, inject } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { NgStyle } from '@angular/common';
import { PaginatedResponse } from '../../../../core/models/response.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [
    NgStyle,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  paginatedResponse!: PaginatedResponse<User>;
  searchQueryControl: FormControl<string> = new FormControl(this.route.snapshot.queryParams['search'] === undefined ? '' : this.route.snapshot.queryParams['search'].toString());
  currentPage: number = this.route.snapshot.queryParams['page'] === undefined ? 1 : parseInt(this.route.snapshot.queryParams['page']);

  ngOnInit() {
    this.goToPage(this.currentPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.userService.getStaffUsers(this.searchQueryControl.value, page)
      .subscribe(paginatedResponse => {
        this.paginatedResponse = paginatedResponse;
        let queryParams: any = {};
        if (this.currentPage !== 1) {
          queryParams['page'] = this.currentPage;
        }
        if (this.searchQueryControl.value !== '') {
          queryParams['search'] = this.searchQueryControl.value;
        }
        void this.router.navigate([], {
          relativeTo: this.route,
          queryParams: queryParams,
        });
      });
  }

  filterPage() {
    this.goToPage(1);
  }
}
