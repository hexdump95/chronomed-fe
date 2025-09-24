import { Routes } from '@angular/router';
import { AccountForm } from './account-form/account-form';
import { UserForm } from './user-form/user-form';
import { UserList } from './user-list/user-list';

const userRoutes: Routes = [
  {
    path: '',
    component: UserList
  },
  {
    path: 'new',
    component: UserForm
  },
  {
    path: ':id',
    component: UserForm
  },
  {
    path: ':id/account',
    component: AccountForm
  },
];

export default userRoutes;
