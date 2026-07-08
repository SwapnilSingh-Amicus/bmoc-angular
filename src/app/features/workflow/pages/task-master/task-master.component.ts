import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucidePlus, LucideChevronDown, LucideTrash2, LucideDownload, LucideFilter, LucideSearch } from '@lucide/angular';
import { WORKFLOW_TASKS } from '../../../../core/constants/app.constants';
import { WorkflowTaskMaster } from '../../../../core/models/app.models';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-task-master',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePlus, LucideChevronDown, LucideTrash2, LucideDownload, LucideFilter, LucideSearch],
  templateUrl: './task-master.component.html',
  styleUrls: ['./task-master.component.scss'],
})
export class TaskMasterComponent {
  
  private toastService = inject(ToastService);
  private router = inject(Router);

  search              = signal('');
  pageSize            = signal(10);
  currentPage         = signal(1);
  isExporting         = signal(false);
  selectedItems       = signal<Set<string>>(new Set());

  allWorkflowTasks = WORKFLOW_TASKS;

  readonly hasSelectedItems = computed(() => this.selectedItems().size > 0);

  readonly filtered = computed(() => {
    const s = this.search().toLowerCase();
    return this.allWorkflowTasks.filter(t =>
      !s || 
      t.stage.toLowerCase().includes(s) || 
      t.taskTitle.toLowerCase().includes(s) || 
      t.userRole.toLowerCase().includes(s) ||
      t.business.toLowerCase().includes(s)
    );
  });

  constructor() {}

  onSearch(v: string) { this.search.set(v); }
  
  openCreateTaskPage() { 
    this.router.navigate(['/workflow/task-master/create']);
  }
  
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
    
    if (confirm(`Are you sure you want to delete ${count} selected item(s)?`)) {
      console.log('Deleting items:', Array.from(this.selectedItems()));
      this.selectedItems.set(new Set());
      this.toastService.success(`${count} item(s) deleted successfully!`);
    }
  }

  async exportToXLSX() {
    this.isExporting.set(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create CSV data
    const data = this.filtered();
    const headers = ['Stage', 'Task Title/Instructions', 'User/Role', 'Type', 'Reason Code', 'Business', 'Location', 'Updated On'];
    const csvContent = [
      headers.join(','),
      ...data.map(t => [
        t.stage,
        `"${t.taskTitle}"`,
        t.userRole,
        t.type,
        t.reasonCode,
        t.business,
        t.location,
        t.updatedOn
      ].join(','))
    ].join('\n');
    
    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bmoc-task-master-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    this.isExporting.set(false);
    this.toastService.success('Task Master exported successfully!');
  }
}
