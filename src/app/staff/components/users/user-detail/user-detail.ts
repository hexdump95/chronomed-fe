import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Role, User } from '../../../../core/models/user.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Chip } from '../../../../shared/ui/chip/chip';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-user-detail',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    Chip,
    RouterLink,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  private toastService = inject(ToastService);

  user: User | null = null;
  roles!: Role[];
  userFormGroup: FormGroup = this.fb.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    enabled: [true, Validators.required],
    roles: ['', Validators.required],
  });

  ngOnInit() {
    this.userService.getAllRoles().subscribe(resRoles => {
      this.roles = resRoles;
      if (this.route.snapshot.params['id'] != undefined) {
        this.userService.getStaffUser(this.route.snapshot.params['id']).subscribe(res => {
            this.user = res;
            let userRoles = res.roles!.map(x => x.id).toString().split(',');
            this.userFormGroup.patchValue({
              username: res.username,
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.email,
              enabled: res.enabled,
              roles: userRoles.toString(),
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
    const selectedRoleIds: string = this.userFormGroup.value.roles;
    const selectedRoles = this.roles.filter(role =>
      selectedRoleIds.includes(role.id)
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

  getUserFormRoles(): string {
    return this.userFormGroup.get('roles')?.value ?? '';
  }

  getSelectedRoles(): string[] {
    return this.stringToArray(this.getUserFormRoles().toString());
  }

  getRoleName(roleId: string) {
    return this.roles.filter(role => role.id === roleId).map(role => role.name).toString();
  }

  stringToArray(string: string) {
    return string.toString().split(',').filter(str => str !== '');
  }

  updateRole(event: any) {
    let roles: string[] = this.stringToArray(this.getUserFormRoles().toString());
    if (!roles.includes(event.target.value)) {
      roles.push(event.target.value);
    }
    const rolesString = roles.join(',');
    this.userFormGroup.get('roles')?.setValue(rolesString);
  }

  removeTag(roleId: string) {
    let roles: string[] = this.stringToArray(this.getUserFormRoles().toString());
    roles = roles.filter(id => id !== roleId);
    const rolesString = roles.join(',');
    this.userFormGroup.get('roles')?.setValue(rolesString);
  }

}
