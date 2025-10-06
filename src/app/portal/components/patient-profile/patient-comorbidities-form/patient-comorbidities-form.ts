import { Component, inject } from '@angular/core';
import { ToastService } from '../../../../core/services/toast.service';
import { Comorbidity } from '../../../../core/models/comorbidity.model';
import { ComorbidityService } from '../../../../core/services/comorbidity.service';
import { PatientProfileService } from '../../../services/patient-profile.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-patient-comorbidities-form',
  imports: [],
  templateUrl: './patient-comorbidities-form.html',
  styleUrl: './patient-comorbidities-form.css'
})
export class PatientComorbiditiesForm {
  toastService = inject(ToastService);
  comorbidityService = inject(ComorbidityService);
  patientProfileService = inject(PatientProfileService);

  comorbidities: { comorbidity: Comorbidity, active: boolean }[] = [];

  ngOnInit() {
    forkJoin({
      comorbidities: this.comorbidityService.getAllComorbidities(),
      selectedComorbidityIds: this.patientProfileService.getComorbidities(),
    }).subscribe({
      next: data => {
        this.comorbidities = data.comorbidities.map(comorbidity => {
          return {
            comorbidity: comorbidity,
            active: data.selectedComorbidityIds.includes(comorbidity.id!),
          };
        });
      },
      error: _ => {
      }
    });
  }

  onClickSelectedComorbidity(id: number) {
    let comorbidity = this.comorbidities.find(x => x.comorbidity.id === id)!;
    comorbidity.active = !comorbidity.active;
  }

  onSubmit() {
    const comorbidityIds = this.comorbidities.filter(x => x.active).map(x => x.comorbidity.id!);
    this.patientProfileService.updateComorbidities(comorbidityIds).subscribe(_ => {
      this.toastService.success('Comorbidities updated successfully.');
    });
  }
}
