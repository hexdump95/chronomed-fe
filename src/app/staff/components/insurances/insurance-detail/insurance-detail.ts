import { Component, inject } from '@angular/core';
import { InsuranceService } from '../../../../core/services/insurance.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { Insurance } from '../../../../core/models/insurance.model';
import { DatePipe } from '@angular/common';

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
  }

}
