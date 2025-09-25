import { Routes } from '@angular/router';
import { FacilityList } from './facility-list/facility-list';
import { FacilityForm } from './facility-form/facility-form';
import { FacilityDetail } from './facility-detail/facility-detail';

const facilityRoutes: Routes = [
  {
    path: '',
    component: FacilityList
  },
  {
    path: 'new',
    component: FacilityForm
  },
  {
    path: ':id',
    component: FacilityDetail
  },
  {
    path: ':id/edit',
    component: FacilityForm
  }
];

export default facilityRoutes;
