import { Routes } from '@angular/router';
import { ComorbidityList } from './comorbidity-list/comorbidity-list';

const comorbidityRoutes: Routes = [
  {
    path: '',
    component: ComorbidityList
  },
];

export default comorbidityRoutes;
