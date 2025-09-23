import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { ToastService } from '../../../../core/services/toast.service';
import { SpecialtyPrice } from '../../../../core/models/specialty.model';

@Component({
  selector: 'app-specialty-delete-dialog',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './specialty-delete-dialog.html',
  styleUrl: './specialty-delete-dialog.css'
})
export class SpecialtyDeleteDialog {
  specialtyService = inject(SpecialtyService);
  toastService = inject(ToastService);
  data = inject(DIALOG_DATA);
  dialogRef = inject<DialogRef<boolean>>(DialogRef<boolean>);

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.specialtyService.deleteSpecialty(this.data.specialty.id).subscribe(_ => {
      this.toastService.success('Specialty deleted successfully');
      this.dialogRef.close(true);
    });
  }
}
