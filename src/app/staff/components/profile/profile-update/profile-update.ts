import { Component, inject } from '@angular/core';
import { StaffProfileService } from '../../../services/staff-profile.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
import { PlaceService } from '../../../../core/services/place.service';
import { District, Locality, Province } from '../../../../core/models/place.model';
import { StaffProfile } from '../../../models/staff-profile.model';

@Component({
  selector: 'app-profile-update',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile-update.html',
  styleUrl: './profile-update.css'
})
export class ProfileUpdate {
  staffProfileService = inject(StaffProfileService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService);
  placeService = inject(PlaceService);
  router = inject(Router);

  staffProfile!: StaffProfile;
  provinces: Province[] = [];
  districts: District[] = [];
  localities: Locality[] = [];

  staffProfileFormGroup: FormGroup = this.fb.group({
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    provinceId: ['', Validators.required],
    districtId: ['', Validators.required],
    localityId: ['', Validators.required],
  });

  ngOnInit() {
    this.staffProfileService.getProfile().subscribe(res => {
      this.staffProfile = res;
      this.staffProfileFormGroup.patchValue({
        email: res.email,
        phoneNumber: res.phoneNumber,
      });
      if (res.localityId != null) {
        this.placeService.getLocality(res.localityId).subscribe(l => {
          this.staffProfileFormGroup.patchValue({
            provinceId: l.provinceId,
            districtId: l.districtId,
            localityId: l.id,
          });
          this.updateDistricts(l.provinceId!);
          this.updateLocalities(l.districtId!);
        });
      }
    });
    this.placeService.getAllProvinces().subscribe(res => {
      this.provinces = res;
    });
  }

  onSubmit() {
    const staffProfileEntity: StaffProfile = this.staffProfileFormGroup.value;
    this.staffProfileService.updateProfile(staffProfileEntity).subscribe(_ => {
      this.toastService.success('Profile updated successfully');
    });
  }

  onCancel() {
    void this.router.navigate(['..'], {relativeTo: this.route});
  }

  updateDistricts(provinceId: number) {
    this.placeService.getAllDistrictsByProvinceId(provinceId).subscribe(res => {
      this.districts = res;
    });
  }

  onChangeUpdateDistricts(event: any) {
    this.updateDistricts(event.target.value);
    this.localities = [];
  }

  updateLocalities(districtId: number) {
    this.placeService.getAllLocalitiesByDistrictId(districtId).subscribe(res => {
      this.localities = res;
    });
  }

  onChangeUpdateLocalities(event: any) {
    this.updateLocalities(event.target.value);
  }
}
