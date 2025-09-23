import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Role, User } from '../../../../core/models/user.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Chip } from '../../../../shared/ui/chip/chip';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    Chip,
    RouterLink,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  private toastService = inject(ToastService);

  user: User | null = null;
  roles!: Role[];
  selectedRoleIds: string[] = [];
  userFormGroup: FormGroup = this.fb.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    enabled: [true, Validators.required],
  });

  ngOnInit() {
    this.userService.getAllRoles().subscribe(resRoles => {
      this.roles = resRoles;
      if (this.route.snapshot.params['id'] != undefined) {
        this.userService.getStaffUser(this.route.snapshot.params['id']).subscribe(res => {
            this.user = res;
            this.selectedRoleIds = res.roles!.map(r => r.id);
            this.userFormGroup.patchValue({
              username: res.username,
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.email,
              enabled: res.enabled,
            });
          }
        );
      }
    });
  }

  onCancel(): void {
    void this.router.navigate(['..'], {relativeTo: this.route});
  }

  onSubmit() {
    const selectedRoles = this.roles.filter(role =>
      this.selectedRoleIds.includes(role.id)
    );
    const userEntity: User = {
      username: this.userFormGroup.value.username,
      firstName: this.userFormGroup.value.firstName,
      lastName: this.userFormGroup.value.lastName,
      email: this.userFormGroup.value.email,
      enabled: this.userFormGroup.value.enabled,
      emailVerified: true,
      roles: selectedRoles,
    };
    if (this.user) {
      this.userService.updateUser(this.user.id!, userEntity).subscribe(_ => {
        this.toastService.success('User updated successfully.');
        void this.router.navigate(['..'], {relativeTo: this.route});
      });
    } else {
      this.userService.createUser(userEntity).subscribe(res => {
        this.toastService.success('User created successfully.');
        void this.router.navigate(['../' + res.id + '/account'], {relativeTo: this.route});
      });
    }
  }

  getRoleName(roleId: string) {
    return this.roles.filter(role => role.id === roleId).map(role => role.name).toString();
  }

  updateRole(event: any) {
    if (event.target.value === '') return;
    if (!this.selectedRoleIds.includes(event.target.value)) {
      this.selectedRoleIds.push(event.target.value);
    }
  }

  removeTag(roleId: string) {
    this.selectedRoleIds = this.selectedRoleIds.filter(id => id !== roleId);
  }

}
