import { Routes } from '@angular/router';
import { ComorbidityList } from './comorbidity-list/comorbidity-list';
import { ComorbidityForm } from './comorbidity-form/comorbidity-form';

const comorbidityRoutes: Routes = [
  {
    path: '',
    component: ComorbidityList
  },
  {
    path: 'new',
    component: ComorbidityForm
  },
  {
    path: ':id',
    component: ComorbidityForm
  },
];

export default comorbidityRoutes;
