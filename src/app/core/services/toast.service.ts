import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastType } from '../../shared/ui/toast/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  showToastSubject = new BehaviorSubject<boolean>(false);
  showToast$ = this.showToastSubject.asObservable();
  messageSubject = new BehaviorSubject<string>('');
  message$ = this.messageSubject.asObservable();
  toastTypeSubject = new BehaviorSubject<string>(ToastType.Success);
  toastType$ = this.toastTypeSubject.asObservable();

  success(message: string) {
    this.messageSubject.next(message);
    this.toastTypeSubject.next(ToastType.Success);
    this.showLoader();
  }

  showLoader() {
    this.showToastSubject.next(true);
    setTimeout(() => {
      this.hideLoader();
    }, 3000);
  }

  hideLoader() {
    this.showToastSubject.next(false);
  }

}
