import { Component, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';

export enum ToastType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info'
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class Toast {
  toastService = inject(ToastService);
  showToastSubject = new BehaviorSubject<boolean>(false);
  showToast$ = this.showToastSubject.asObservable();
  messageSubject = new BehaviorSubject<string>('');
  message$ = this.messageSubject.asObservable();
  toastTypeSubject = new BehaviorSubject<string>(ToastType.Success);
  toastType$ = this.toastTypeSubject.asObservable();

  visible: boolean = false;

  ngOnInit() {
    this.showToast$ = this.toastService.showToast$;
    this.message$ = this.toastService.message$;
    this.toastType$ = this.toastService.toastType$;
  }

  closeToast() {
    this.visible = false;
  }

}
