import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginatedResponse } from '../../../../core/models/response.model';
import { PaginationService } from '../../../../core/services/pagination.service';
import { Dialog } from '@angular/cdk/dialog';
import { ComorbidityService } from '../../../../core/services/comorbidity.service';
import { Comorbidity } from '../../../../core/models/comorbidity.model';
import { ComorbidityDeleteDialog } from '../comorbidity-delete-dialog/comorbidity-delete-dialog';

@Component({
  selector: 'app-comorbidity-list',
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './comorbidity-list.html',
  styleUrl: './comorbidity-list.css'
})
export class ComorbidityList {
  comorbidityService = inject(ComorbidityService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginationService = inject(PaginationService);
  dialog = inject(Dialog);

  paginatedResponse!: PaginatedResponse<Comorbidity>;
  searchQueryControl: FormControl<string> = new FormControl(this.route.snapshot.queryParams['search'] === undefined ? '' : this.route.snapshot.queryParams['search'].toString());
  currentPage: number = this.route.snapshot.queryParams['page'] === undefined ? 1 : parseInt(this.route.snapshot.queryParams['page']);

  ngOnInit() {
    this.goToPage(this.currentPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.comorbidityService.getComorbidities(this.searchQueryControl.value, page)
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

  openDeleteComorbidityDialog(comorbidity: Comorbidity) {
    this.dialog.open<boolean>(ComorbidityDeleteDialog, {
      minWidth: '300px',
      data: {
        comorbidity
      },
      disableClose: true,
    }).closed.subscribe(res => {
      if (res) {
        this.goToPage(this.currentPage);
      }
    });
  }
}
