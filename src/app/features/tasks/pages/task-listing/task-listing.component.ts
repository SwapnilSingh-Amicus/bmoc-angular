import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideChevronLeft, LucideChevronRight, LucidePlus, LucideChevronDown, LucideTrash2, LucideCopy, LucideDownload, LucideFilter } from '@lucide/angular';
import { ALL_TASKS, statusColor } from '../../../../core/constants/app.constants';
import { Task } from '../../../../core/models/app.models';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-task-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideChevronLeft, LucideChevronRight, LucidePlus, LucideChevronDown, LucideTrash2, LucideCopy, LucideDownload, LucideFilter],
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.scss'],
})
export class TaskListingComponent {
  
  private toastService = inject(ToastService);

  search       = signal('');
  filterStatus = signal('All');
  filterType   = signal('All');
  showAddDropdown = signal(false);
  isExporting  = signal(false);
  selectedItems = signal<Set<string>>(new Set());

  allTasks     = ALL_TASKS;
  statusColor  = statusColor;

  readonly statuses = ['All', 'Created', 'Assigned', 'In Progress', 'Approved', 'Rejected'];
  readonly types = ['All', 'Create New Product', 'Raw Material Update', 'New Raw Material', 'Product Extension', 'Product Update', 'Product Deactivation'];

  readonly hasSelectedItems = computed(() => this.selectedItems().size > 0);

  readonly filtered = computed(() => {
    const s  = this.search().toLowerCase();
    const st = this.filterStatus();
    const tp = this.filterType();
    return this.allTasks.filter(t =>
      (st === 'All' || t.status === st) &&
      (tp === 'All' || t.type === tp) &&
      (!s || t.id.toLowerCase().includes(s) || t.reqId.toLowerCase().includes(s) || t.taskName.toLowerCase().includes(s))
    );
  });

  constructor(private router: Router) {}

  onSearch(v: string)  { this.search.set(v); }
  onStatus(v: string)  { this.filterStatus.set(v); }
  onType(v: string)    { this.filterType.set(v); }
  toggleAddDropdown() { this.showAddDropdown.set(!this.showAddDropdown()); }
  
  toggleItemSelection(itemId: string, event: Event) {
    event.stopPropagation();
    const selected = new Set(this.selectedItems());
    if (selected.has(itemId)) {
      selected.delete(itemId);
    } else {
      selected.add(itemId);
    }
    this.selectedItems.set(selected);
  }
  
  toggleSelectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const selected = new Set<string>();
    if (checkbox.checked) {
      this.filtered().forEach(t => selected.add(t.id));
    }
    this.selectedItems.set(selected);
  }
  
  isItemSelected(itemId: string): boolean {
    return this.selectedItems().has(itemId);
  }
  
  deleteSelectedItems() {
    const count = this.selectedItems().size;
    if (count === 0) return;
    
    if (confirm(`Are you sure you want to delete ${count} selected task(s)?`)) {
      console.log('Deleting tasks:', Array.from(this.selectedItems()));
      this.selectedItems.set(new Set());
      this.toastService.success(`${count} task(s) deleted successfully!`);
    }
  }
  
  duplicateSelectedItems() {
    const count = this.selectedItems().size;
    if (count === 0) return;
    
    console.log('Duplicating tasks:', Array.from(this.selectedItems()));
    this.selectedItems.set(new Set());
    this.toastService.success(`${count} task(s) duplicated successfully!`);
  }
  
  addNew(type: string) { 
    this.showAddDropdown.set(false); 
    this.router.navigate(['/requests/new/step1'], { queryParams: { type } }); 
  }

  viewTaskDetails(task: Task) {
    // Store return path in sessionStorage so request-summary can navigate back
    sessionStorage.setItem('returnTo', '/tasks');
    // Navigate to request summary page using the task's request ID
    this.router.navigate(['/requests', task.reqId, 'summary']);
  }

  async exportToXLSX() {
    this.isExporting.set(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create CSV data
    const data = this.filtered();
    const headers = ['Task ID', 'Request ID', 'Task Name', 'Type', 'Assigned To', 'Due Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...data.map(t => [
        t.id,
        t.reqId,
        `"${t.taskName}"`,
        `"${t.type}"`,
        t.assignedTo,
        t.dueDate,
        t.status
      ].join(','))
    ].join('\n');
    
    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bmoc-tasks-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    this.isExporting.set(false);
    this.toastService.success('Tasks exported successfully!');
  }
}

