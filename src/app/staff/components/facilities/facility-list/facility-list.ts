import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginatedResponse } from '../../../../core/models/response.model';
import { FacilityService } from '../../../../core/services/facility.service';
import { Facility } from '../../../../core/models/facility.model';
import { PaginationService } from '../../../../core/services/pagination.service';
import { Dialog } from '@angular/cdk/dialog';
import { FacilityDeleteDialog } from '../facility-delete-dialog/facility-delete-dialog';

@Component({
  selector: 'app-facility-list',
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './facility-list.html',
  styleUrl: './facility-list.css'
})
export class FacilityList {
  facilityService = inject(FacilityService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginationService = inject(PaginationService);
  dialog = inject(Dialog);

  paginatedResponse!: PaginatedResponse<Facility>;
  searchQueryControl: FormControl<string> = new FormControl(this.route.snapshot.queryParams['search'] === undefined ? '' : this.route.snapshot.queryParams['search'].toString());
  currentPage: number = this.route.snapshot.queryParams['page'] === undefined ? 1 : parseInt(this.route.snapshot.queryParams['page']);

  ngOnInit() {
    this.goToPage(this.currentPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.facilityService.getFacilities(this.searchQueryControl.value, page)
      .subscribe(paginatedResponse => {
        this.paginatedResponse = paginatedResponse;
        this.paginationService.updateQueryParams(this.currentPage, this.searchQueryControl.value);
      });
  }

  filterPage() {
    this.goToPage(1);
  }

  openDeleteFacilityDialog(facility: Facility) {
    this.dialog.open<boolean>(FacilityDeleteDialog, {
      minWidth: '300px',
      data: {
        facility: facility
      },
      disableClose: true,
    }).closed.subscribe(res => {
      if (res) {
        this.goToPage(this.currentPage);
      }
    });
  }
}
