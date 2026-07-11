import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
import { PROFIT_CENTERS, REASON_CODES, SITES, WORKFLOW_REQUEST_TYPE_OPTIONS } from '../../../../core/constants/app.constants';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  
  private router = inject(Router);
  private toastService = inject(ToastService);

  // Form fields
  stageName           = signal('');
  businessDropdownOpen = signal(false);

  taskType            = signal('');
  taskTitle           = signal('');
  responsibility      = signal('');
  requestType         = signal('');
  taskInstructions    = signal('');
  businessType        = signal<string>(''); // multi-select stored as comma-separated string
  businessTypeSearch  = signal('');
  businessRole        = signal('');
  reasonCode          = signal('All');
  location            = signal('All');
  isSaving            = signal(false);

  readonly requestTypeOptions = WORKFLOW_REQUEST_TYPE_OPTIONS;
  readonly profitCenters = PROFIT_CENTERS;
  readonly reasonCodeOptions = REASON_CODES;
  readonly siteOptions = SITES;
  readonly filteredProfitCenters = computed(() => {
    const search = this.businessTypeSearch().trim().toLowerCase();
    if (!search) return this.profitCenters;
    return this.profitCenters.filter(profitCenter => profitCenter.toLowerCase().includes(search));
  });


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
    this.businessType.set('');
    this.businessTypeSearch.set('');
    this.businessRole.set('');
    this.reasonCode.set('All');
    this.location.set('All');
  }

  toggleBusinessDropdown() {
    this.businessDropdownOpen.set(!this.businessDropdownOpen());
  }


  // Multi-select helpers for the Business dropdown
  onBusinessTypeToggle(value: string) {
    const current = this.businessType();
    const list = current ? current.split(',').map(v => v.trim()).filter(Boolean) : [];
    const exists = list.includes(value);

    const next = exists ? list.filter(v => v !== value) : [...list, value];
    this.businessType.set(next.join(','));
  }

  isBusinessTypeSelected(value: string): boolean {
    const current = this.businessType();
    if (!current) return false;
    return current.split(',').map(v => v.trim()).filter(Boolean).includes(value);
  }

}
