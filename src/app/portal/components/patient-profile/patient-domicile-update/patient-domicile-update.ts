import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
import { PlaceService } from '../../../../core/services/place.service';
import { District, Locality, Province } from '../../../../core/models/place.model';
import { PatientProfileService } from '../../../services/patient-profile.service';
import { Domicile } from '../../../models/patient-profile.model';

@Component({
  selector: 'app-patient-domicile-update',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './patient-domicile-update.html',
  styleUrl: './patient-domicile-update.css'
})
export class PatientDomicileUpdate {
  patientProfileService = inject(PatientProfileService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService);
  placeService = inject(PlaceService);
  router = inject(Router);

  provinces: Province[] = [];
  districts: District[] = [];
  localities: Locality[] = [];

  domicileFormGroup: FormGroup = this.fb.group({
    street: ['', Validators.required],
    number: ['', Validators.required],
    floor: ['', Validators.required],
    provinceId: ['', Validators.required],
    districtId: ['', Validators.required],
    localityId: ['', Validators.required],
  });

  ngOnInit() {
      this.patientProfileService.getDomicile().subscribe(res => {
        this.domicileFormGroup.patchValue({
          street: res.street,
          number: res.number,
          floor: res.floor,
        });
        if (res.localityId != null) {
          this.placeService.getLocality(res.localityId).subscribe(l => {
            this.domicileFormGroup.patchValue({
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
    const domicileEntity: Domicile = this.domicileFormGroup.value;
      this.patientProfileService.updateDomicile(domicileEntity).subscribe(_ => {
        this.toastService.success('Domicile updated successfully.');
        void this.router.navigate(['../..'], {relativeTo: this.route});
      });

  }

  onCancel() {
    void this.router.navigate(['../..'], {relativeTo: this.route});
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
