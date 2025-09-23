import { Routes } from '@angular/router';
import { Staff } from './staff';
import { UserList } from './components/users/user-list/user-list';
import { UserForm } from './components/users/user-form/user-form';
import { AccountForm } from './components/users/account-form/account-form';
import { SpecialtyList } from './components/specialties/specialty-list/specialty-list';
import { SpecialtyDetail } from './components/specialties/specialty-detail/specialty-detail';
import { SpecialtyForm } from './components/specialties/specialty-form/specialty-form';

const staffRoutes: Routes = [
  {
    path: '',
    component: Staff
  },
  {
    path: 'users',
    component: UserList
  },
  {
    path: 'users/new',
    component: UserForm
  },
  {
    path: 'users/:id',
    component: UserForm
  },
  {
    path: 'users/:id/account',
    component: AccountForm
  },
  {
    path: 'specialties',
    component: SpecialtyList
  },
  {
    path: 'specialties/new',
    component: SpecialtyForm
  },
  {
    path: 'specialties/:id',
    component: SpecialtyDetail
  },
  {
    path: 'specialties/:id/edit',
    component: SpecialtyForm
  },
];

export default staffRoutes;
