import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComorbidityService } from '../../../../core/services/comorbidity.service';
import { Comorbidity } from '../../../../core/models/comorbidity.model';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-comorbidity-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './comorbidity-form.html',
  styleUrl: './comorbidity-form.css'
})
export class ComorbidityForm {
  comorbidityService = inject(ComorbidityService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService);
  router = inject(Router);

  comorbidityId: number | null = null;

  comorbidityFormGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit() {
    this.comorbidityId = this.route.snapshot.params['id'] ?? null;
    if (this.comorbidityId != null) {
      this.comorbidityService.getComorbidity(this.comorbidityId).subscribe(res => {
        this.comorbidityFormGroup.patchValue({
          name: res.name,
          description: res.description
        });
      });
    }
  }

  onSubmit() {
    const comorbidityEntity: Comorbidity = {
      name: this.comorbidityFormGroup.value.name,
      description: this.comorbidityFormGroup.value.description,
    };
    if (this.comorbidityId != null) {
      this.comorbidityService.updateComorbidity(this.comorbidityId, comorbidityEntity).subscribe(_ => {
        this.toastService.success('Comorbidity updated successfully.');
        void this.router.navigate(['..'], {relativeTo: this.route});
      });
    } else {
      this.comorbidityService.createComorbidity(comorbidityEntity).subscribe(_ => {
        this.toastService.success('Comorbidity created successfully.');
        void this.router.navigate(['..'], {relativeTo: this.route});
      });
    }

  }

  onCancel() {
      void this.router.navigate(['..'], {relativeTo: this.route});
  }
}
