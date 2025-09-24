import { Routes } from '@angular/router';
import { Staff } from './staff';

const staffRoutes: Routes = [
  {
    path: '',
    component: Staff
  },
  {
    path: 'users',
    loadChildren: () => import(`./components/users/user.routes`),
  },
  {
    path: 'specialties',
    loadChildren: () => import(`./components/specialties/specialty.routes`),
  },
  {
    path: 'comorbidities',
    loadChildren: () => import(`./components/comorbidities/comorbidity.routes`),
  },
];

export default staffRoutes;
