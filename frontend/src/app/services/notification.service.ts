import { Injectable, signal } from '@angular/core';

export interface NotificationItem {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private nextId = 1;
  readonly notifications = signal<NotificationItem[]>([]);

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', durationMs = 4000) {
    const id = this.nextId++;
    const item: NotificationItem = { id, type, message };

    this.notifications.update(current => [...current, item]);

    if (durationMs > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, durationMs);
    }
  }

  success(message: string, durationMs = 4000) {
    this.show(message, 'success', durationMs);
  }

  error(message: string, durationMs = 5000) {
    this.show(message, 'error', durationMs);
  }

  warning(message: string, durationMs = 4000) {
    this.show(message, 'warning', durationMs);
  }

  dismiss(id: number) {
    this.notifications.update(current => current.filter(item => item.id !== id));
  }
}
