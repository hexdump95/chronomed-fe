import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { ToastService } from '../../../../core/services/toast.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SpecialtyPrice } from '../../../../core/models/specialty.model';
import { InsuranceService } from '../../../../core/services/insurance.service';
import { InsuranceCoverage } from '../../../../core/models/insurance.model';

@Component({
  selector: 'app-coverage-form-dialog',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './coverage-form-dialog.html',
  styleUrl: './coverage-form-dialog.css'
})
export class CoverageFormDialog {
  fb = inject(FormBuilder);
  insuranceService = inject(InsuranceService);
  toastService = inject(ToastService);
  data = inject(DIALOG_DATA);
  dialogRef = inject<DialogRef<InsuranceCoverage>>(DialogRef<InsuranceCoverage>);

  coverageFormGroup: FormGroup = this.fb.group({
    validFrom: ['', Validators.required],
    validTo: ['', Validators.required],
    amount: ['', Validators.required],
  });


  onSubmit() {
    const coverageEntity: InsuranceCoverage = this.coverageFormGroup.value;

    this.insuranceService.createCoverage(this.data.insuranceId, coverageEntity).subscribe(res => {
      this.toastService.success('Coverage created successfully.');
      this.dialogRef.close(res);
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
