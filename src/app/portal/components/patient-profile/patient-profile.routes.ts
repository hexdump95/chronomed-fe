import { Routes } from '@angular/router';
import { PatientProfileForm } from './patient-profile-form/patient-profile-form';
import { PatientDomicileForm } from './patient-domicile-form/patient-domicile-form';
import { PatientComorbiditiesForm } from './patient-comorbidities-form/patient-comorbidities-form';
import { PatientInsuranceList } from './patient-insurance-list/patient-insurance-list';

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
  {
    path: 'insurances',
    component: PatientInsuranceList
  },
];

export default patientProfileRoutes;
