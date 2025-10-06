import { Routes } from '@angular/router';
import { PatientProfileUpdate } from './patient-profile-update/patient-profile-update';
import { PatientDomicileUpdate } from './patient-domicile-update/patient-domicile-update';
import { PatientComorbiditiesForm } from './patient-comorbidities-form/patient-comorbidities-form';

const patientProfileRoutes: Routes = [
  {
    path: '',
    component: PatientProfileUpdate
  },
  {
    path: 'domicile',
    component: PatientDomicileUpdate
  },
  {
    path: 'comorbidities',
    component: PatientComorbiditiesForm
  },
];

export default patientProfileRoutes;
