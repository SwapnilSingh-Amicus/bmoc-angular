import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';
import { LucideCheckCircle, LucideXCircle, LucideInfo, LucideAlertTriangle, LucideX } from '@lucide/angular';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideCheckCircle, LucideXCircle, LucideInfo, LucideAlertTriangle, LucideX],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toastService.getToasts()" 
        class="toast toast--{{ toast.type }}"
        [class.toast--enter]="true"
      >
        <div class="toast__icon">
          <svg *ngIf="toast.type === 'success'" lucideCheckCircle [size]="20"></svg>
          <svg *ngIf="toast.type === 'error'" lucideXCircle [size]="20"></svg>
          <svg *ngIf="toast.type === 'info'" lucideInfo [size]="20"></svg>
          <svg *ngIf="toast.type === 'warning'" lucideAlertTriangle [size]="20"></svg>
        </div>
        <div class="toast__message">{{ toast.message }}</div>
        <button class="toast__close" (click)="toastService.remove(toast.id)">
          <svg lucideX [size]="16"></svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 320px;
      max-width: 500px;
      padding: 14px 16px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 14px;
      font-weight: 500;
      pointer-events: auto;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast--success {
      background-color: #29b931;
      color: white;
    }

    .toast--error {
      background-color: #ed4e33;
      color: white;
    }

    .toast--info {
      background-color: #2795a8;
      color: white;
    }

    .toast--warning {
      background-color: #f5a900;
      color: white;
    }

    .toast__icon {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .toast__message {
      flex: 1;
      line-height: 1.4;
    }

    .toast__close {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      opacity: 0.8;
      transition: opacity 0.2s;
      flex-shrink: 0;

      &:hover {
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
