import { Component, inject } from '@angular/core';
import { ToastService } from '../../../../core/services/toast.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ComorbidityService } from '../../../../core/services/comorbidity.service';

@Component({
  selector: 'app-comorbidity-delete-dialog',
  imports: [],
  templateUrl: './comorbidity-delete-dialog.html',
  styleUrl: './comorbidity-delete-dialog.css'
})
export class ComorbidityDeleteDialog {
  comorbidityService = inject(ComorbidityService);
  toastService = inject(ToastService);
  data = inject(DIALOG_DATA);
  dialogRef = inject<DialogRef<boolean>>(DialogRef<boolean>);

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.comorbidityService.deleteComorbidity(this.data.comorbidity.id).subscribe(_ => {
      this.toastService.success('Comorbidity deleted successfully');
      this.dialogRef.close(true);
    });
  }
}
