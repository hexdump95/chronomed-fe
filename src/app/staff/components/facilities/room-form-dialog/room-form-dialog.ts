import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FacilityService } from '../../../../core/services/facility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
import { Room } from '../../../../core/models/facility.model';
import { Specialty } from '../../../../core/models/specialty.model';
import { SpecialtyService } from '../../../../core/services/specialty.service';
import { Chip } from '../../../../shared/ui/chip/chip';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-room-form-dialog',
  imports: [
    ReactiveFormsModule,
    Chip
  ],
  templateUrl: './room-form-dialog.html',
  styleUrl: './room-form-dialog.css'
})
export class RoomFormDialog {
  facilityService = inject(FacilityService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  toastService = inject(ToastService);
  specialtyService = inject(SpecialtyService);
  router = inject(Router);
  data = inject(DIALOG_DATA);
  dialogRef = inject<DialogRef<Room>>(DialogRef<Room>);

  roomId: number | null = null;
  specialties: Specialty[] = [];
  selectedSpecialtyIds: number[] = [];

  roomFormGroup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    this.roomId = this.data.room?.id ?? null;
    if (this.roomId != null) {
      this.facilityService.getRoom(this.roomId).subscribe(res => {
        this.roomFormGroup.patchValue({
          name: res.name,
          description: res.description,
        });
        this.selectedSpecialtyIds = res.specialtyIds ?? [];
      });
    }
    this.specialtyService.getAllSpecialties().subscribe(res => {
      this.specialties = res;
    });
  }

  onSubmit() {
    const roomEntity: Room = {
      ...this.roomFormGroup.value,
      specialtyIds: this.selectedSpecialtyIds
    };
    if (this.roomId != null) {
      this.facilityService.updateRoom(this.roomId, roomEntity).subscribe(res => {
        this.toastService.success('Room updated successfully.');
        this.dialogRef.close(res);
      });
    } else {
      this.facilityService.createRoom(this.data.facilityId, roomEntity).subscribe(res => {
        this.toastService.success('Room created successfully.');
        this.dialogRef.close(res);
      });
    }

  }

  onCancel() {
    this.dialogRef.close();
  }

  getSpecialtyName(specialtyId: string) {
    return this.specialties
      .filter(specialty => specialty.id === parseInt(specialtyId))
      .map(specialty => specialty.name).toString();
  }

  updateSpecialty(event: any) {
    if (event.target.value === '') return;
    if (!this.selectedSpecialtyIds.includes(parseInt(event.target.value))) {
      this.selectedSpecialtyIds.push(parseInt(event.target.value));
    }
  }

  removeTag(specialtyId: number) {
    this.selectedSpecialtyIds = this.selectedSpecialtyIds.filter(id => id !== specialtyId);
  }

}
