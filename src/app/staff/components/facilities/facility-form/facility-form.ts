import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacilityService } from '../../../../core/services/facility.service';
import { Facility } from '../../../../core/models/facility.model';
import { ToastService } from '../../../../core/services/toast.service';
import { PlaceService } from '../../../../core/services/place.service';
import { District, Locality, Province } from '../../../../core/models/place.model';

@Component({
  selector: 'app-facility-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './facility-form.html',
  styleUrl: './facility-form.css'
})
export class FacilityForm {
  facilityService = inject(FacilityService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService);
  placeService = inject(PlaceService);
  router = inject(Router);

  facilityId: number | null = null;
  provinces: Province[] = [];
  districts: District[] = [];
  localities: Locality[] = [];

  facilityFormGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    taxIdentificationNumber: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    provinceId: ['', Validators.required],
    districtId: ['', Validators.required],
    localityId: ['', Validators.required],
  });

  ngOnInit() {
    this.facilityId = this.route.snapshot.params['id'] ?? null;
    if (this.facilityId != null) {
      this.facilityService.getFacility(this.facilityId).subscribe(res => {
        this.facilityFormGroup.patchValue({
          name: res.name,
          description: res.description,
          taxIdentificationNumber: res.taxIdentificationNumber,
          email: res.email,
          phoneNumber: res.phoneNumber,
        });
        if (res.localityId != null) {
          this.placeService.getLocality(res.localityId).subscribe(l => {
            this.facilityFormGroup.patchValue({
              provinceId: l.provinceId,
              districtId: l.districtId,
              localityId: l.id,
            });
            this.updateDistricts(l.provinceId!);
            this.updateLocalities(l.districtId!);
          });
        }
      });
    }
    this.placeService.getAllProvinces().subscribe(res => {
      this.provinces = res;
    });
  }

  onSubmit() {
    const facilityEntity: Facility = this.facilityFormGroup.value;
    if (this.facilityId != null) {
      this.facilityService.updateFacility(this.facilityId, facilityEntity).subscribe(_ => {
        this.toastService.success('Facility updated successfully.');
        void this.router.navigate(['../..'], {relativeTo: this.route});
      });
    } else {
      this.facilityService.createFacility(facilityEntity).subscribe(_ => {
        this.toastService.success('Facility created successfully.');
        void this.router.navigate(['..'], {relativeTo: this.route});
      });
    }

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
