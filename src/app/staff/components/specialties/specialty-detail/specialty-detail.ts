import { Component, inject } from '@angular/core';
import { Specialty } from '../../../../core/models/specialty.model';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

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

  specialty!: Specialty;

  ngOnInit() {
    this.specialtyService.getSpecialty(this.route.snapshot.params['id']).subscribe(res => {
      this.specialty = res;
    });
  }

}
