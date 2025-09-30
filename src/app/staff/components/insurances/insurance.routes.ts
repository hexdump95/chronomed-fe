import { Routes } from '@angular/router';
import { InsuranceList } from './insurance-list/insurance-list';
import { InsuranceDetail } from './insurance-detail/insurance-detail';

const insuranceRoutes: Routes = [
  {
    path: '',
    component: InsuranceList
  },
  {
    path: ':id',
    component: InsuranceDetail
  },
];

export default insuranceRoutes;
