import { Routes } from '@angular/router';
import { PaymentTypeList } from './payment-type-list/payment-type-list';

const paymentRoutes: Routes = [
  {
    path: 'types',
    component: PaymentTypeList
  },
];

export default paymentRoutes;
