import { Component, inject } from '@angular/core';
import { ToastService } from '../../../../core/services/toast.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { InsuranceService } from '../../../../core/services/insurance.service';

@Component({
  selector: 'app-insurance-delete-dialog',
  imports: [],
  templateUrl: './insurance-delete-dialog.html',
  styleUrl: './insurance-delete-dialog.css'
})
export class InsuranceDeleteDialog {
  insuranceService = inject(InsuranceService);
  toastService = inject(ToastService);
  data = inject(DIALOG_DATA);
  dialogRef = inject<DialogRef<boolean>>(DialogRef<boolean>);

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.insuranceService.deleteInsurance(this.data.insurance.id).subscribe(_ => {
      this.toastService.success('Insurance deleted successfully');
      this.dialogRef.close(true);
    });
  }
}
