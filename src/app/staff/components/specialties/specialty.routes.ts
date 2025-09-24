import { Routes } from '@angular/router';
import { SpecialtyList } from './specialty-list/specialty-list';
import { SpecialtyForm } from './specialty-form/specialty-form';
import { SpecialtyDetail } from './specialty-detail/specialty-detail';

const specialtyRoutes: Routes = [
  {
    path: '',
    component: SpecialtyList
  },
  {
    path: 'new',
    component: SpecialtyForm
  },
  {
    path: ':id',
    component: SpecialtyDetail
  },
  {
    path: ':id/edit',
    component: SpecialtyForm
  }
];

export default specialtyRoutes;
