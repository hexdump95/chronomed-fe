import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginatedResponse } from '../../../../core/models/response.model';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { Specialty } from '../../../../core/models/specialty.model';
import { PaginationService } from '../../../../core/services/pagination.service';

@Component({
  selector: 'app-specialty-list',
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './specialty-list.html',
  styleUrl: './specialty-list.css'
})
export class SpecialtyList {
  specialtyService = inject(SpecialtyService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginationService = inject(PaginationService);

  paginatedResponse!: PaginatedResponse<Specialty>;
  searchQueryControl: FormControl<string> = new FormControl(this.route.snapshot.queryParams['search'] === undefined ? '' : this.route.snapshot.queryParams['search'].toString());
  currentPage: number = this.route.snapshot.queryParams['page'] === undefined ? 1 : parseInt(this.route.snapshot.queryParams['page']);

  ngOnInit() {
    this.goToPage(this.currentPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.specialtyService.getSpecialties(this.searchQueryControl.value, page)
      .subscribe(paginatedResponse => {
        this.paginatedResponse = paginatedResponse;
        this.paginationService.updateQueryParams(this.currentPage, this.searchQueryControl.value);
      });
  }

  filterPage() {
    this.goToPage(1);
  }
}
