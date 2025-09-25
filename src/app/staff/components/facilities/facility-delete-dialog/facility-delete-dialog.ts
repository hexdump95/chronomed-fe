import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FacilityService } from '../../../../core/services/facility.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-facility-delete-dialog',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './facility-delete-dialog.html',
  styleUrl: './facility-delete-dialog.css'
})
export class FacilityDeleteDialog {
  facilityService = inject(FacilityService);
  toastService = inject(ToastService);
  data = inject(DIALOG_DATA);
  dialogRef = inject<DialogRef<boolean>>(DialogRef<boolean>);

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.facilityService.deleteFacility(this.data.facility.id).subscribe(_ => {
      this.toastService.success('Facility deleted successfully');
      this.dialogRef.close(true);
    });
  }
}
