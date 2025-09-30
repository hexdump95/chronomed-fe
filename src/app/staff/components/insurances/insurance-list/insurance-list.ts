import { Component, inject } from '@angular/core';
import { Pagination } from '../../../../shared/ui/pagination/pagination';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginationService } from '../../../../core/services/pagination.service';
import { Dialog } from '@angular/cdk/dialog';
import { PaginatedResponse } from '../../../../core/models/response.model';
import { Insurance } from '../../../../core/models/insurance.model';
import { InsuranceService } from '../../../../core/services/insurance.service';

@Component({
  selector: 'app-insurance-list',
    imports: [
        Pagination,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './insurance-list.html',
  styleUrl: './insurance-list.css'
})
export class InsuranceList {
  insuranceService = inject(InsuranceService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginationService = inject(PaginationService);
  dialog = inject(Dialog);

  paginatedResponse!: PaginatedResponse<Insurance>;
  searchQueryControl: FormControl<string> = new FormControl(this.route.snapshot.queryParams['search'] === undefined ? '' : this.route.snapshot.queryParams['search'].toString());
  currentPage: number = this.route.snapshot.queryParams['page'] === undefined ? 1 : parseInt(this.route.snapshot.queryParams['page']);
  pageSize: number = 10;

  ngOnInit() {
    this.goToPage(this.currentPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.insuranceService.getInsurances(this.searchQueryControl.value, page)
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

  openDeleteInsuranceDialog(insurance: Insurance) {
  //   this.dialog.open<boolean>(InsuranceDeleteDialog, {
  //     minWidth: '300px',
  //     data: {
  //       insurance: insurance
  //     },
  //     disableClose: true,
  //   }).closed.subscribe(res => {
  //     if (res) {
  //       this.goToPage(this.currentPage);
  //     }
  //   });
  }
}
