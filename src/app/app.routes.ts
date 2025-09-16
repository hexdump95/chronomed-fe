import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuardWithConfig } from 'angular-auth-oidc-client';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'portal',
    loadChildren: () => import(`./portal/portal.routes`),
    canActivate: [autoLoginPartialRoutesGuardWithConfig('portal')]
  },
  {
    path: 'staff',
    loadChildren: () => import(`./staff/staff.routes`),
    canActivate: [autoLoginPartialRoutesGuardWithConfig('staff')]
  },
];
