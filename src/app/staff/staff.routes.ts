import { Routes } from '@angular/router';
import { Staff } from './staff';
import { UserList } from './components/users/user-list/user-list';
import { UserDetail } from './components/users/user-detail/user-detail';

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
];

export default staffRoutes;
