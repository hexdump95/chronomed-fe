import { Component, inject } from '@angular/core';
import { InsuranceService } from '../../../../core/services/insurance.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { Insurance, InsuranceCoverage } from '../../../../core/models/insurance.model';
import { DatePipe } from '@angular/common';
import { CoverageFormDialog } from '../coverage-form-dialog/coverage-form-dialog';

@Component({
  selector: 'app-insurance-detail',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './insurance-detail.html',
  styleUrl: './insurance-detail.css'
})
export class InsuranceDetail {
  insuranceService = inject(InsuranceService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  dialog = inject(Dialog);

  insurance!: Insurance;

  ngOnInit() {
    this.insuranceService.getInsurance(this.route.snapshot.params['id']).subscribe(res => {
      this.insurance = res;
    });
  }

  openCreateCoverageDialog() {
    this.dialog.open<InsuranceCoverage>(CoverageFormDialog, {
      minWidth: '300px',
      data: {
        insuranceId: this.insurance.id
      },
      disableClose: true
    }).closed.subscribe(res => {
      if (res) {
        this.insurance.coverages!.push(res);
      }
    });
  }

}
