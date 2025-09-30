import { Component, inject } from '@angular/core';
import { FacilityService } from '../../../../core/services/facility.service';
import { ToastService } from '../../../../core/services/toast.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-room-delete-dialog',
  imports: [],
  templateUrl: './room-delete-dialog.html',
  styleUrl: './room-delete-dialog.css'
})
export class RoomDeleteDialog {
  facilityService = inject(FacilityService);
  toastService = inject(ToastService);
  data = inject(DIALOG_DATA);
  dialogRef = inject<DialogRef<boolean>>(DialogRef<boolean>);

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.facilityService.deleteRoom(this.data.room.id).subscribe(_ => {
      this.toastService.success('Room deleted successfully');
      this.dialogRef.close(true);
    });
  }
}
