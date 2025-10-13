import { Component, inject } from '@angular/core';
import { ToastService } from '../../../../core/services/toast.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { PatientProfileService } from '../../../services/patient-profile.service';

@Component({
  selector: 'app-patient-insurance-delete-dialog',
  imports: [],
  templateUrl: './patient-insurance-delete-dialog.html',
  styleUrl: './patient-insurance-delete-dialog.css'
})
export class PatientInsuranceDeleteDialog {
  patientProfileService = inject(PatientProfileService);
  toastService = inject(ToastService);
  data = inject(DIALOG_DATA);
  dialogRef = inject<DialogRef<boolean>>(DialogRef<boolean>);

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.patientProfileService.deletePatientInsurance(this.data.patientInsurance.id).subscribe(_ => {
      this.toastService.success('Insurance deleted successfully');
      this.dialogRef.close(true);
    });
  }

}
