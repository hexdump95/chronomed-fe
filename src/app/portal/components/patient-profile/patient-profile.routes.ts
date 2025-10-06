import { Routes } from '@angular/router';
import { PatientProfileForm } from './patient-profile-form/patient-profile-form';
import { PatientDomicileForm } from './patient-domicile-form/patient-domicile-form';
import { PatientComorbiditiesForm } from './patient-comorbidities-form/patient-comorbidities-form';

const patientProfileRoutes: Routes = [
  {
    path: '',
    component: PatientProfileForm
  },
  {
    path: 'domicile',
    component: PatientDomicileForm
  },
  {
    path: 'comorbidities',
    component: PatientComorbiditiesForm
  },
];

export default patientProfileRoutes;
