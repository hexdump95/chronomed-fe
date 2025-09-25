import { Component, inject } from '@angular/core';
import { Facility } from '../../../../core/models/facility.model';
import { FacilityService } from '../../../../core/services/facility.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlaceService } from '../../../../core/services/place.service';
import { Locality } from '../../../../core/models/place.model';

@Component({
  selector: 'app-facility-detail',
  imports: [
    RouterLink
  ],
  templateUrl: './facility-detail.html',
  styleUrl: './facility-detail.css'
})
export class FacilityDetail {
  facilityService = inject(FacilityService);
  placeService = inject(PlaceService);
  route = inject(ActivatedRoute);
  location: Locality | null = null;

  facility!: Facility;

  ngOnInit() {
    this.facilityService.getFacility(this.route.snapshot.params['id']).subscribe(res => {
      this.facility = res;
      if (res.localityId) {
        this.placeService.getLocality(res.localityId).subscribe(l => {
          this.location = l;
        });
      }
    });
  }

}
