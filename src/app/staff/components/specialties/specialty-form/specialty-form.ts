import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { Specialty } from '../../../../core/models/specialty.model';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-specialty-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './specialty-form.html',
  styleUrl: './specialty-form.css'
})
export class SpecialtyForm {
  specialtyService = inject(SpecialtyService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService);
  router = inject(Router);

  specialtyId: number | null = null;

  specialtyFormGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit() {
    this.specialtyId = this.route.snapshot.params['id'] ?? null;
    if (this.specialtyId != null) {
      this.specialtyService.getSpecialty(this.specialtyId).subscribe(res => {
        this.specialtyFormGroup.patchValue({
          name: res.name,
          description: res.description
        });
      });
    }
  }

  onSubmit() {
    const specialtyEntity: Specialty = {
      name: this.specialtyFormGroup.value.name,
      description: this.specialtyFormGroup.value.description,
    };
    if (this.specialtyId != null) {
      this.specialtyService.updateSpecialty(this.specialtyId, specialtyEntity).subscribe(_ => {
        this.toastService.success('Specialty updated successfully.');
        void this.router.navigate(['../..'], {relativeTo: this.route});
      });
    } else {
      this.specialtyService.createSpecialty(specialtyEntity).subscribe(_ => {
        this.toastService.success('Specialty created successfully.');
        void this.router.navigate(['..'], {relativeTo: this.route});
      });
    }

  }

  onCancel() {
      void this.router.navigate(['..'], {relativeTo: this.route});
  }
}
