import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" *ngIf="notificationService.notifications().length > 0">
      <div
        *ngFor="let toast of notificationService.notifications()"
        class="toast"
        [ngClass]="'toast-' + toast.type"
        (click)="notificationService.dismiss(toast.id)"
      >
        <span class="toast-icon">
          {{ toast.type === 'success' ? '✔' : toast.type === 'error' ? '✖' : '▲' }}
        </span>
        <div class="toast-body">
          <strong *ngIf="toast.type === 'success'">[SUCESSO] </strong>
          <strong *ngIf="toast.type === 'error'">[ERRO] </strong>
          <strong *ngIf="toast.type === 'warning'">[ALERTA] </strong>
          <span>{{ toast.message }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-body {
      word-break: break-word;
    }
    .toast {
      cursor: pointer;
    }
  `]
})
export class ToastComponent {
  notificationService = inject(NotificationService);
}
