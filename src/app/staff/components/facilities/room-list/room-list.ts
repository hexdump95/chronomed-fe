import { Component, inject } from '@angular/core';
import { Pagination } from '../../../../shared/ui/pagination/pagination';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacilityService } from '../../../../core/services/facility.service';
import { PaginationService } from '../../../../core/services/pagination.service';
import { Dialog } from '@angular/cdk/dialog';
import { PaginatedResponse } from '../../../../core/models/response.model';
import { Room } from '../../../../core/models/facility.model';
import { RoomDeleteDialog } from '../room-delete-dialog/room-delete-dialog';
import { RoomFormDialog } from '../room-form-dialog/room-form-dialog';

@Component({
  selector: 'app-room-list',
  imports: [
    Pagination,
    ReactiveFormsModule,
  ],
  templateUrl: './room-list.html',
  styleUrl: './room-list.css'
})
export class RoomList {

  facilityService = inject(FacilityService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginationService = inject(PaginationService);
  dialog = inject(Dialog);

  paginatedResponse!: PaginatedResponse<Room>;
  searchQueryControl: FormControl<string> = new FormControl(this.route.snapshot.queryParams['search'] === undefined ? '' : this.route.snapshot.queryParams['search'].toString());
  currentPage: number = this.route.snapshot.queryParams['page'] === undefined ? 1 : parseInt(this.route.snapshot.queryParams['page']);
  pageSize: number = 10;

  ngOnInit() {
    this.goToPage(this.currentPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.facilityService.getRooms(this.route.snapshot.params['id'], page)
      .subscribe(paginatedResponse => {
        this.paginatedResponse = paginatedResponse;
        this.paginationService.updateQueryParams(this.currentPage, this.searchQueryControl.value);
      });
  }

  onPageChanged(page: number) {
    this.goToPage(page);
  }

  openDeleteRoomDialog(room: Room) {
    this.dialog.open<boolean>(RoomDeleteDialog, {
      minWidth: '300px',
      data: {
        room
      },
      disableClose: true,
    }).closed.subscribe(res => {
      if (res) {
        this.goToPage(this.currentPage);
      }
    });
  }

  openRoomFormDialog(room?: Room) {
    this.dialog.open<boolean>(RoomFormDialog, {
      minWidth: '300px',
      data: {
        room: room ?? null,
        facilityId: this.route.snapshot.params['id']
      },
      disableClose: true,
    }).closed.subscribe(res => {
      if (res) {
        this.goToPage(this.currentPage);
      }
    });
  }
}
