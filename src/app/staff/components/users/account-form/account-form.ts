import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FacilityService } from '../../../../core/services/facility.service';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';
import { Specialty } from '../../../../core/models/specialty.model';
import { Facility } from '../../../../core/models/facility.model';
import { Account } from '../../../../core/models/user.model';
import { Chip } from '../../../../shared/ui/chip/chip';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-account-form',
  imports: [
    RouterLink,
    Chip,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './account-form.html',
  styleUrl: './account-form.css'
})
export class AccountForm {
  fb = inject(FormBuilder);
  facilityService = inject(FacilityService);
  specialtyService = inject(SpecialtyService);
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastService = inject(ToastService);

  facilities: Facility[] = [];
  specialties: Specialty[] = [];
  selectedFacilityIds: number[] = [];
  selectedSpecialtyIds: number[] = [];
  account!: Account;
  accountFormGroup: FormGroup = this.fb.group({
    phoneNumber: ['', Validators.required],
    fileNumber: ['', Validators.required],
  });

  ngOnInit() {
    forkJoin({
      facilities: this.facilityService.getAllFacilities(),
      specialties: this.specialtyService.getAllSpecialties(),
      account: this.userService.getAccount(this.route.snapshot.params['id'])
    }).subscribe({
      next: (res) => {
        this.facilities = res.facilities;
        this.specialties = res.specialties;
        this.account = res.account;

        this.accountFormGroup.patchValue({
          phoneNumber: res.account.phoneNumber,
          fileNumber: res.account.fileNumber,
        });

        this.selectedFacilityIds = res.account.facilityIds;
        this.selectedSpecialtyIds = res.account.specialtyIds;
      },
      error: (_) => {
      }
    });
  }

  onCancel(): void {
    void this.router.navigate(['../..'], {relativeTo: this.route});
  }

  onSubmit() {
    const accountEntity: Account = {
      phoneNumber: this.accountFormGroup.value.phoneNumber,
      fileNumber: this.accountFormGroup.value.fileNumber,
      facilityIds: this.selectedFacilityIds,
      specialtyIds: this.selectedSpecialtyIds,
    };

    this.userService.updateAccount(this.account.id!, accountEntity).subscribe(_ => {
      this.toastService.success('User account updated successfully.');
      void this.router.navigate(['../..'], {relativeTo: this.route});
    });
  }

  getFacilityName(facilityId: number) {
    return this.facilities
      .filter(facility => facility.id === facilityId)
      .map(facility => facility.name)
      .toString();
  }

  updateFacility(event: any) {
    if (event.target.value === '') return;
    const value = parseInt(event.target.value);
    if (!this.selectedFacilityIds.includes(value)) {
      this.selectedFacilityIds.push(value);
    }
  }

  removeFacilityTag(facilityId: number) {
    this.selectedFacilityIds = this.selectedFacilityIds.filter(id => id !== facilityId);
  }

  getSpecialtyName(specialtyId: number) {
    return this.specialties.filter(specialty => specialty.id === specialtyId).map(specialty => specialty.name).toString();
  }

  updateSpecialty(event: any) {
    if (event.target.value === '') return;
    const value = parseInt(event.target.value);
    if (!this.selectedSpecialtyIds.includes(value)) {
      this.selectedSpecialtyIds.push(value);
    }
  }

  removeSpecialtyTag(specialtyId: number) {
    this.selectedSpecialtyIds = this.selectedSpecialtyIds.filter(id => id !== specialtyId);
  }

}
