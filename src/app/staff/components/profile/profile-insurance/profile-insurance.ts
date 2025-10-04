import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Insurance, InsuranceType } from '../../../../core/models/insurance.model';
import { InsuranceService } from '../../../../core/services/insurance.service';
import { StaffProfileService } from '../../../services/staff-profile.service';
import { Chip } from '../../../../shared/ui/chip/chip';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-profile-insurance',
  imports: [
    ReactiveFormsModule,
    Chip,
    FormsModule,
  ],
  templateUrl: './profile-insurance.html',
  styleUrl: './profile-insurance.css'
})
export class ProfileInsurance {
  insuranceService = inject(InsuranceService);
  staffProfileService = inject(StaffProfileService);
  toastService = inject(ToastService);

  insuranceTypes: InsuranceType[] = [];
  insurances: Insurance[] = [];
  selectedInsurances: Insurance[] = [];

  ngOnInit() {
    this.insuranceService.getAllInsuranceTypes().subscribe(res => {
      this.insuranceTypes = res;
    });
    this.staffProfileService.getInsuranceIds().subscribe(res => {
      this.insuranceService.getInsurancesByIds(res)
        .subscribe(res => {
          this.selectedInsurances = res;
        });
    });
  }

  onChangeUpdateInsurances(event: any) {
    if (event.target.value === '') return;
    this.updateInsurances(event.target.value);
  }

  updateInsurances(insuranceTypeId: number) {
    this.insuranceService.getAllInsurancesByType(insuranceTypeId).subscribe(res => {
      this.insurances = res;
    });
  }

  updateInsurance(event: any) {
    if (event.target.value === '') return;
    if (!this.selectedInsurances.map(x => x.id).includes(parseInt(event.target.value))) {
      this.insuranceService.getInsurancesByIds([event.target.value]).subscribe(res => {
        this.selectedInsurances.push(res[0]);
      })
    }
  }

  removeTag(insuranceId: number) {
    this.selectedInsurances = this.selectedInsurances.filter(x => x.id !== insuranceId);
  }

  onCancel() {

  }

  onSubmit() {
    console.log(this.selectedInsurances);
    this.staffProfileService.updateInsurances(this.selectedInsurances.map(x => x.id!))
      .subscribe(_ => {
        this.toastService.success('Insurances updated successfully');
      });
  }
}
