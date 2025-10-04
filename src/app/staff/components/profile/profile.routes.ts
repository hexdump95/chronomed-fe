import { Routes } from '@angular/router';
import { ProfileUpdate } from './profile-update/profile-update';
import { ProfileInsurance } from './profile-insurance/profile-insurance';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileUpdate
  },
  {
    path: 'insurances',
    component: ProfileInsurance
  }
];

export default profileRoutes;
