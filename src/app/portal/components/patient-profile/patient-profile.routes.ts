import { Routes } from '@angular/router';
import { PatientProfileUpdate } from './patient-profile-update/patient-profile-update';

const patientProfileRoutes: Routes = [
  {
    path: '',
    component: PatientProfileUpdate
  },
];

export default patientProfileRoutes;
