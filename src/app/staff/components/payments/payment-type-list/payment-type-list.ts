import { Component, inject } from '@angular/core';
import { PaymentType } from '../../../../core/models/payment.model';
import { PaymentService } from '../../../../core/services/payment.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-payment-type-list',
  imports: [],
  templateUrl: './payment-type-list.html',
  styleUrl: './payment-type-list.css'
})
export class PaymentTypeList {
  paymentService = inject(PaymentService);
  toastService = inject(ToastService);

  paymentTypes: PaymentType[] = [];
  isPatching = false;

  ngOnInit() {
    this.paymentService.getPaymentTypes().subscribe(res => {
      this.paymentTypes = res;
    });
  }

  patchPaymentTypeActive(id: number) {
    this.isPatching = true;
    this.paymentService.patchPaymentTypeActive(id).subscribe(_ => {
      this.toastService.success("Payment Type Updated");
      this.isPatching = false;
    });
  }
}
