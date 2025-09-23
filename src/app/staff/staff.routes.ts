import { Routes } from '@angular/router';
import { Staff } from './staff';
import { UserList } from './components/users/user-list/user-list';
import { UserDetail } from './components/users/user-detail/user-detail';
import { AccountDetail } from './components/users/account-detail/account-detail';
import { SpecialtyList } from './components/specialties/specialty-list/specialty-list';

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
    component: UserDetail
  },
  {
    path: 'users/:id',
    component: UserDetail
  },
  {
    path: 'users/:id/account',
    component: AccountDetail
  },
  {
    path: 'specialties',
    component: SpecialtyList
  },
];

export default staffRoutes;
