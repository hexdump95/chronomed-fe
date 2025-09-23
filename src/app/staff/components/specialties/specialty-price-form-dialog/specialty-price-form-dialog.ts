import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpecialtyPrice } from '../../../../core/models/specialty.model';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-specialty-price-form-dialog',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './specialty-price-form-dialog.html',
  styleUrl: './specialty-price-form-dialog.css'
})
export class SpecialtyPriceFormDialog {
  fb = inject(FormBuilder);
  specialtyService = inject(SpecialtyService);
  toastService = inject(ToastService);
  data = inject(DIALOG_DATA);
  dialogRef = inject<DialogRef<SpecialtyPrice>>(DialogRef<SpecialtyPrice>);

  specialtyPriceFormGroup: FormGroup = this.fb.group({
    validFrom: ['', Validators.required],
    validTo: ['', Validators.required],
    price: ['', Validators.required],
  });


  onSubmit() {
    const specialtyPriceEntity: SpecialtyPrice = {
      validFrom: this.specialtyPriceFormGroup.value.validFrom,
      validTo: this.specialtyPriceFormGroup.value.validTo,
      price: this.specialtyPriceFormGroup.value.price,
    };
    this.specialtyService.createSpecialtyPrice(this.data.specialtyId, specialtyPriceEntity).subscribe(res => {
      this.toastService.success('Price created successfully.');
      this.dialogRef.close(res);
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
