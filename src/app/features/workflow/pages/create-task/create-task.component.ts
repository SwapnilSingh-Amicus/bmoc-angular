import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideX } from '@lucide/angular';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideX],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  
  private router = inject(Router);
  private toastService = inject(ToastService);

  // Form fields
  stageName           = signal('');
  taskType            = signal('');
  taskTitle           = signal('');
  responsibility      = signal('');
  requestType         = signal('');
  taskInstructions    = signal('');
  businessType        = signal('All');
  businessRole        = signal('');
  reasonCode          = signal('All');
  location            = signal('All');
  isSaving            = signal(false);

  saveNewTask() {
    // Validate form
    if (!this.stageName() || !this.taskType() || !this.taskTitle()) {
      this.toastService.error('Please fill in all required fields');
      return;
    }
    
    this.isSaving.set(true);
    
    // Simulate saving
    setTimeout(() => {
      this.toastService.success('New task created successfully!');
      this.isSaving.set(false);
      this.router.navigate(['/workflow/task-master']);
    }, 500);
  }

  cancelCreate() {
    this.router.navigate(['/workflow/task-master']);
  }

  resetForm() {
    this.stageName.set('');
    this.taskType.set('');
    this.taskTitle.set('');
    this.responsibility.set('');
    this.requestType.set('');
    this.taskInstructions.set('');
    this.businessType.set('All');
    this.businessRole.set('');
    this.reasonCode.set('All');
    this.location.set('All');
  }
}
