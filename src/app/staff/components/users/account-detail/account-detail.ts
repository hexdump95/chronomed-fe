import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FacilityService } from '../../../../core/services/facility.service';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';
import { Specialty } from '../../../../core/models/specialty.model';
import { Facility } from '../../../../core/models/facility.model';
import { Account, User } from '../../../../core/models/user.model';
import { Chip } from '../../../../shared/ui/chip/chip';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-account-detail',
  imports: [
    RouterLink,
    Chip,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './account-detail.html',
  styleUrl: './account-detail.css'
})
export class AccountDetail {
  fb = inject(FormBuilder);
  facilityService = inject(FacilityService);
  specialtyService = inject(SpecialtyService);
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastService = inject(ToastService);

  facilities: Facility[] = [];
  specialties: Specialty[] = [];
  account!: Account;
  accountFormGroup: FormGroup = this.fb.group({
    phoneNumber: ['', Validators.required],
    fileNumber: ['', Validators.required],
    facilityIds: ['', Validators.required],
    specialtyIds: ['', Validators.required],
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

        let accountFacilities = res.account.facilityIds.toString().split(',');
        let accountSpecialties = res.account.specialtyIds.toString().split(',');
        this.accountFormGroup.patchValue({
          phoneNumber: res.account.phoneNumber,
          fileNumber: res.account.fileNumber,
          facilityIds: accountFacilities.toString(),
          specialtyIds: accountSpecialties.toString(),
        });
      },
      error: (_) => {
      }
    });
  }

  onCancel(): void {
    void this.router.navigate(['../..'], {relativeTo: this.route});
  }

  onSubmit() {
    const selectedFacilityIds: string = this.accountFormGroup.value.facilityIds;
    const selectedSpecialtyIds: string = this.accountFormGroup.value.specialtyIds;

    const accountEntity: Account = {
      phoneNumber: this.accountFormGroup.value.phoneNumber,
      fileNumber: this.accountFormGroup.value.fileNumber,
      facilityIds: selectedFacilityIds.split(',').map(x => parseInt(x)),
      specialtyIds: selectedSpecialtyIds.split(',').map(x => parseInt(x)),
    };

    this.userService.updateAccount(this.account.id!, accountEntity).subscribe(_ => {
      this.toastService.success('User account updated successfully.');
      void this.router.navigate(['../..'], {relativeTo: this.route});
    });
  }

  stringToArray(string: string) {
    return string.toString().split(',').map(x => parseInt(x)).filter(x => !isNaN(x));
  }

  getUserFormFacilities(): string {
    return this.accountFormGroup.get('facilityIds')?.value ?? '';
  }

  getSelectedFacilities(): number[] {
    return this.stringToArray(this.getUserFormFacilities().toString());
  }

  getFacilityName(facilityId: number) {
    return this.facilities.filter(facility => facility.id === facilityId).map(facility => facility.name).toString();
  }

  updateFacility(event: any) {
    let facilities: number[] = this.stringToArray(this.getUserFormFacilities().toString());
    if (!facilities.includes(event.target.value)) {
      facilities.push(event.target.value);
    }
    const facilitiesString = facilities.join(',');
    this.accountFormGroup.get('facilityIds')?.setValue(facilitiesString);
  }

  removeFacilityTag(facilityId: number) {
    let facilities: number[] = this.stringToArray(this.getUserFormFacilities().toString());
    facilities = facilities.filter(id => id !== facilityId);
    const facilitiesString = facilities.join(',');
    this.accountFormGroup.get('facilityIds')?.setValue(facilitiesString);
  }

  getUserFormSpecialties(): string {
    return this.accountFormGroup.get('specialtyIds')?.value ?? '';
  }

  getSelectedSpecialties(): number[] {
    return this.stringToArray(this.getUserFormSpecialties().toString());
  }

  getSpecialtyName(specialtyId: number) {
    return this.specialties.filter(specialty => specialty.id === specialtyId).map(specialty => specialty.name).toString();
  }

  updateSpecialty(event: any) {
    let specialties: number[] = this.stringToArray(this.getUserFormSpecialties().toString());
    if (!specialties.includes(event.target.value)) {
      specialties.push(event.target.value);
    }
    const specialtiesString = specialties.join(',');
    this.accountFormGroup.get('specialtyIds')?.setValue(specialtiesString);
  }

  removeSpecialtyTag(specialtyId: number) {
    let specialties: number[] = this.stringToArray(this.getUserFormSpecialties().toString());
    specialties = specialties.filter(id => id !== specialtyId);
    const specialtiesString = specialties.join(',');
    this.accountFormGroup.get('specialtyIds')?.setValue(specialtiesString);
  }


}
