import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientProfileService } from '../../../services/patient-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
import { PatientInsurance } from '../../../models/patient-profile.model';
import { InsuranceService } from '../../../../core/services/insurance.service';
import { Insurance, InsuranceType } from '../../../../core/models/insurance.model';
import { forkJoin } from 'rxjs';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-patient-insurance-form-dialog',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './patient-insurance-form-dialog.html',
  styleUrl: './patient-insurance-form-dialog.css'
})
export class PatientInsuranceFormDialog {
  patientProfileService = inject(PatientProfileService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService);
  insuranceService = inject(InsuranceService);
  router = inject(Router);
  data = inject(DIALOG_DATA);
  dialogRef = inject<DialogRef<boolean>>(DialogRef<boolean>);

  patientInsuranceFormGroup: FormGroup = this.fb.group({
    affiliateNumber: ['', Validators.required],
    insuranceId: ['', Validators.required],
    insuranceTypeId: ['', Validators.required],
  });

  patientInsuranceId: number | null = null;
  insuranceTypes: InsuranceType[] = [];
  insurances: Insurance[] = [];
  patientInsurance: PatientInsurance | null = null;

  ngOnInit() {
    this.patientInsuranceId = this.data.patientInsurance === null ? null : this.data.patientInsurance.insuranceId;

    forkJoin({
      insuranceTypes: this.insuranceService.getAllInsuranceTypes(),
    }).subscribe({
      next: value => {
        this.insuranceTypes = value.insuranceTypes;

        if (this.patientInsuranceId != null) {
          this.insuranceService
            .getInsurance(this.patientInsuranceId).subscribe(res => {
            const typeId = res.insuranceTypeId!;

            this.patientInsuranceFormGroup.patchValue({
              affiliateNumber: this.data.patientInsurance.affiliateNumber,
              insuranceId: this.patientInsuranceId,
              insuranceTypeId: typeId
            });

            this.updateInsurances(typeId);

          });

        }

      }
    });

  }

  onSubmit() {
    const patientInsuranceEntity: PatientInsurance = this.patientInsuranceFormGroup.value;
    if (this.patientInsuranceId === null) {
      this.patientProfileService.createPatientInsurance(patientInsuranceEntity).subscribe(res => {
        this.toastService.success('Insurance updated successfully.');
        this.dialogRef.close(true);
      });
    } else {
      this.patientProfileService.updatePatientInsurance(this.patientInsuranceId, patientInsuranceEntity).subscribe(_ => {
        this.toastService.success('Insurance updated successfully.');
        patientInsuranceEntity.id = this.patientInsuranceId!;
        this.dialogRef.close(true);
      });
    }

  }

  onCancel() {
    this.dialogRef.close(false);
  }

  updateInsurances(insuranceTypeId: number) {
    this.insuranceService.getAllInsurancesByType(insuranceTypeId).subscribe(res => {
      this.insurances = res;
    });
  }

  onChangeUpdateInsurances(event: any) {
    this.updateInsurances(event.target.value);
  }
}
