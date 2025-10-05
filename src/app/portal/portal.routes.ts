import { Routes } from '@angular/router';
import { Portal } from './portal';

const portalRoutes: Routes = [
  {
    path: '',
    component: Portal
  },
  {
    path: 'profile',
    loadChildren: () => import(`./components/patient-profile/patient-profile.routes`),
  },
];

export default portalRoutes;
