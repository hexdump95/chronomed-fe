import { Component, inject } from '@angular/core';
import { Specialty, SpecialtyPrice } from '../../../../core/models/specialty.model';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { SpecialtyPriceFormDialog } from '../specialty-price-form-dialog/specialty-price-form-dialog';

@Component({
  selector: 'app-specialty-detail',
  imports: [
    DatePipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './specialty-detail.html',
  styleUrl: './specialty-detail.css'
})
export class SpecialtyDetail {
  specialtyService = inject(SpecialtyService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  dialog = inject(Dialog);

  specialty!: Specialty;

  ngOnInit() {
    this.specialtyService.getSpecialty(this.route.snapshot.params['id']).subscribe(res => {
      this.specialty = res;
    });
  }

  openCreateSpecialtyPriceDialog() {
    this.dialog.open<SpecialtyPrice>(SpecialtyPriceFormDialog, {
      minWidth: '300px',
      data: {
        specialtyId: this.specialty.id
      },
      disableClose: true
    }).closed.subscribe(res => {
      if (res) {
        this.specialty.specialtyPrices!.push(res);
      }
    });
  }

}
