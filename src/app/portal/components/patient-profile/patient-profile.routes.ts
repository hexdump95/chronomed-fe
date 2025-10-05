import { Routes } from '@angular/router';
import { PatientProfileUpdate } from './patient-profile-update/patient-profile-update';
import { PatientDomicileUpdate } from './patient-domicile-update/patient-domicile-update';

const patientProfileRoutes: Routes = [
  {
    path: '',
    component: PatientProfileUpdate
  },
  {
    path: 'domicile',
    component: PatientDomicileUpdate
  },
];

export default patientProfileRoutes;
