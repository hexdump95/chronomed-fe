import { Routes } from '@angular/router';
import { Staff } from './staff';
import { UserList } from './components/users/user-list/user-list';

const staffRoutes: Routes = [
  {
    path: '',
    component: Staff
  },
  {
    path: 'users',
    component: UserList
  }
];

export default staffRoutes;

