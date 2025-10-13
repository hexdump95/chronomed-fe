import { Component, inject } from '@angular/core';
import { PatientProfileService } from '../../../services/patient-profile.service';
import { PatientInsurance } from '../../../models/patient-profile.model';
import { InsuranceService } from '../../../../core/services/insurance.service';
import { Insurance } from '../../../../core/models/insurance.model';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { PatientInsuranceFormDialog } from '../patient-insurance-form-dialog/patient-insurance-form-dialog';
import { PatientInsuranceDeleteDialog } from '../patient-insurance-delete-dialog/patient-insurance-delete-dialog';

@Component({
  selector: 'app-patient-insurance-list',
  imports: [],
  templateUrl: './patient-insurance-list.html',
  styleUrl: './patient-insurance-list.css'
})
export class PatientInsuranceList {
  patientProfileService = inject(PatientProfileService);
  insuranceService = inject(InsuranceService);
  route = inject(ActivatedRoute);
  dialog = inject(Dialog);

  patientInsurances: PatientInsurance[] = [];
  insurances: Insurance[] = [];

  ngOnInit() {
    this.loadInsurances();
  }

  loadInsurances() {
    this.patientProfileService.getInsurances().subscribe(res => {
      this.patientInsurances = res;
      this.insuranceService.getInsurancesByIds(res.map(x => x.insuranceId)).subscribe(res => {
        this.patientInsurances.forEach(patientInsurance => {
          const resInsurance = res.find(x => x.id == patientInsurance.insuranceId)!;
          patientInsurance.name = resInsurance.name;
          patientInsurance.insuranceTypeName = resInsurance.insuranceTypeName;
        });
      });
    });
  }

  openPatientInsuranceFormDialog(patientInsurance?: PatientInsurance) {
    this.dialog.open<boolean>(PatientInsuranceFormDialog, {
      minWidth: '300px',
      data: {
        patientInsurance: patientInsurance ?? null
      },
      disableClose: true,
    }).closed.subscribe(res => {
      if (res) {
        this.loadInsurances();
      }
    });
  }

  openDeletePatientInsuranceDialog(patientInsurance: PatientInsurance) {
    this.dialog.open<boolean>(PatientInsuranceDeleteDialog, {
      minWidth: '300px',
      data: {
        patientInsurance
      },
      disableClose: true,
    }).closed.subscribe(res => {
      if (res) {
        this.loadInsurances();
      }
    });
  }
}
