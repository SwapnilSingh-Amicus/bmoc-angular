import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucidePlus, LucideChevronDown, LucideTrash2, LucideDownload, LucideFilter, LucideSearch } from '@lucide/angular';
import { BUSINESS_ROLES, PROFIT_CENTERS, ROLE_MAPPINGS, SITES, WORKFLOW_TASKS } from '../../../../core/constants/app.constants';
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

  // Filter popup
  showFilterModal = signal(false);
  tempFilterStage = signal('');
  tempFilterType = signal('');
  tempFilterReasonCode = signal('');
  tempFilterBusiness = signal('');
  tempFilterLocation = signal('');

  // Active filters (used by popup apply)
  filterStage = signal('');
  filterType = signal('');
  filterReasonCode = signal('');
  filterBusiness = signal('');
  filterLocation = signal('');

  allWorkflowTasks: WorkflowTaskMaster[] = WORKFLOW_TASKS.map((task, index) => {
    const mappedSite = SITES[index % SITES.length] ?? task.location;
    const mappedProfitCenter = PROFIT_CENTERS[index % PROFIT_CENTERS.length] ?? task.business;
    const mappedRole = ROLE_MAPPINGS[index % ROLE_MAPPINGS.length]?.user ?? BUSINESS_ROLES[index % BUSINESS_ROLES.length]?.name ?? task.userRole;

    return {
      ...task,
      location: mappedSite,
      business: mappedProfitCenter,
      userRole: mappedRole,
    };
  });

  readonly hasSelectedItems = computed(() => this.selectedItems().size > 0);

  // Dropdown options from existing WORKFLOW_TASKS
  readonly stageOptions = computed(() => {
    const set = new Set<string>();
    this.allWorkflowTasks.forEach(t => set.add(t.stage));
    return Array.from(set).sort();
  });

  readonly typeOptions = computed(() => {
    const set = new Set<string>();
    this.allWorkflowTasks.forEach(t => t.type && set.add(t.type));
    return Array.from(set).sort();
  });

  readonly reasonCodeOptions = computed(() => {
    const set = new Set<string>();
    this.allWorkflowTasks.forEach(t => t.reasonCode && set.add(t.reasonCode));
    return Array.from(set).sort();
  });

  readonly businessOptions = computed(() => {
    return PROFIT_CENTERS;
  });

  readonly locationOptions = computed(() => {
    return SITES;
  });

  readonly filtered = computed(() => {
    const s = this.search().toLowerCase();
    const fs = this.filterStage();
    const ft = this.filterType();
    const fr = this.filterReasonCode();
    const fb = this.filterBusiness();
    const fl = this.filterLocation();

    return this.allWorkflowTasks.filter(t => {
      const matchesSearch =
        !s ||
        t.stage.toLowerCase().includes(s) ||
        t.taskTitle.toLowerCase().includes(s) ||
        t.userRole.toLowerCase().includes(s) ||
        t.business.toLowerCase().includes(s);

      const matchesStage = !fs || t.stage === fs;
      const matchesType = !ft || t.type === ft;
      const matchesReason = !fr || t.reasonCode === fr;
      const matchesBusiness = !fb || t.business === fb;
      const matchesLocation = !fl || t.location === fl;

      return matchesSearch && matchesStage && matchesType && matchesReason && matchesBusiness && matchesLocation;
    });
  });

  clearFilters() {
    this.tempFilterStage.set('');
    this.tempFilterType.set('');
    this.tempFilterReasonCode.set('');
    this.tempFilterBusiness.set('');
    this.tempFilterLocation.set('');

    this.filterStage.set('');
    this.filterType.set('');
    this.filterReasonCode.set('');
    this.filterBusiness.set('');
    this.filterLocation.set('');
    this.showFilterModal.set(false);
  }

  applyFilters() {
    this.filterStage.set(this.tempFilterStage());
    this.filterType.set(this.tempFilterType());
    this.filterReasonCode.set(this.tempFilterReasonCode());
    this.filterBusiness.set(this.tempFilterBusiness());
    this.filterLocation.set(this.tempFilterLocation());
    this.showFilterModal.set(false);
  }



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
    const headers = ['Stage', 'Task Title/Instructions', 'User/Role', 'Type', 'Reason Code', 'Profit Center', 'Site', 'Updated On'];
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
