import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
import { PatientProfileService } from '../../../services/patient-profile.service';
import { DocumentType, PatientProfile, SelfPerceivedIdentity, Sex } from '../../../models/patient-profile.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-patient-profile-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './patient-profile-form.html',
  styleUrl: './patient-profile-form.css'
})
export class PatientProfileForm {
  patientProfileService = inject(PatientProfileService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService);
  router = inject(Router);

  patientProfile!: PatientProfile;
  documentTypes: DocumentType[] = [];
  sexList: Sex[] = [];
  selfPerceivedIdentities: SelfPerceivedIdentity[] = [];

  patientProfileFormGroup: FormGroup = this.fb.group({
    identityDocument: ['', Validators.required],
    documentTypeId: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    sexId: ['', Validators.required],
    selfPerceivedIdentityId: ['', Validators.required],
  });

  ngOnInit() {
    forkJoin({
      patientProfile: this.patientProfileService.getProfile(),
      documentTypes: this.patientProfileService.getDocumentTypes(),
      sexList: this.patientProfileService.getSex(),
      selfPerceivedIdentities: this.patientProfileService.getSelfPerceivedIdentities(),
    }).subscribe(
      {
        next: res => {
          this.patientProfile = res.patientProfile;
          this.patientProfileFormGroup.patchValue({
            identityDocument: res.patientProfile.identityDocument,
            documentTypeId: res.patientProfile.documentTypeId,
            dateOfBirth: res.patientProfile.dateOfBirth,
            sexId: res.patientProfile.sexId,
            selfPerceivedIdentityId: res.patientProfile.selfPerceivedIdentityId,
          });
          this.documentTypes = res.documentTypes;
          this.sexList = res.sexList;
          this.selfPerceivedIdentities = res.selfPerceivedIdentities;
        },
        error: _ => {

        }
      }
    );
  }

  onSubmit() {
    const patientProfileEntity: PatientProfile = this.patientProfileFormGroup.value;
    this.patientProfileService.updateProfile(patientProfileEntity).subscribe(_ => {
      this.toastService.success('Profile updated successfully');
    });
  }

  onCancel() {
    void this.router.navigate(['..'], {relativeTo: this.route});
  }

}
