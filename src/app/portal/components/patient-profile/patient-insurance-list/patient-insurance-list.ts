import { Component, inject } from '@angular/core';
import { PatientProfileService } from '../../../services/patient-profile.service';
import { PatientInsurance } from '../../../models/patient-profile.model';
import { InsuranceService } from '../../../../core/services/insurance.service';
import { Insurance } from '../../../../core/models/insurance.model';

@Component({
  selector: 'app-patient-insurance-list',
  imports: [],
  templateUrl: './patient-insurance-list.html',
  styleUrl: './patient-insurance-list.css'
})
export class PatientInsuranceList {
  patientProfileService = inject(PatientProfileService);
  insuranceService = inject(InsuranceService);

  patientInsurances: PatientInsurance[] = [];
  insurances: Insurance[] = [];

  ngOnInit() {
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

  openPatientInsuranceFormDialog() {

  }

  openDeletePatientInsuranceDialog(insurance: PatientInsurance) {
    
  }
}
