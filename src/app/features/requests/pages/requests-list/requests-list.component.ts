import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucidePlus, LucideChevronLeft, LucideChevronRight, LucideTrash2, LucideCopy, LucideDownload, LucideFilter, LucideChevronDown, LucideX, LucideSearch } from '@lucide/angular';
import { ALL_REQUESTS, statusColor, priorityColor, stageColor } from '../../../../core/constants/app.constants';
import { Request } from '../../../../core/models/app.models';
import { ToastService } from '../../../../core/services/toast.service';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';

@Component({
  selector: 'app-requests-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePlus, LucideChevronLeft, LucideChevronRight, LucideTrash2, LucideCopy, LucideDownload, LucideFilter, LucideChevronDown, LucideX, LucideSearch, DatePickerComponent],
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
})
export class RequestsListComponent {
  
  private toastService = inject(ToastService);

  search        = signal('');
  filterStatus  = signal('All');
  filterType    = signal('All');
  pageSize      = signal(10);
  currentPage   = signal(1);
  isExporting   = signal(false);
  quickSelect   = signal('');
  fromDate      = signal('');
  toDate        = signal('');
  myRequestsOnly = signal(false);

  // Filter modal state
  showFilterModal = signal(false);
  filterReqTitle = signal('');
  filterReqType = signal('');
  filterLocation = signal('');
  filterRequestor = signal('');
  filterRequestorSearch = signal('');
  filterRequestorOpen = signal(false);
  filterStage = signal('');
  
  // Temporary filter values (not applied until "Apply Filters" is clicked)
  tempFilterReqTitle = signal('');
  tempFilterReqType = signal('');
  tempFilterLocation = signal('');
  tempFilterRequestor = signal('');
  tempFilterRequestorSearch = signal('');
  tempFilterStage = signal('');

  // Selection state
  selectedItems = signal<Set<string>>(new Set());

  allRequests   = ALL_REQUESTS;
  statusColor   = statusColor;
  priorityColor = priorityColor;
  stageColor    = stageColor;

  readonly statuses = ['All', 'Draft', 'Submitted', 'In Progress', 'Approved', 'Rejected', 'On Hold', 'Returned', 'Completed'];
  readonly types    = ['All', 'Create New Product', 'Raw Material Update', 'New Raw Material', 'Product Extension', 'Product Update', 'Product Deactivation', 'New Packaging', 'Packaging Update'];
  
  // Filter dropdown options from React app
  readonly REQ_TYPES = ['Create New Product', 'Product Deactivation', 'Raw Material Update', 'New Raw Material', 'Packaging Update', 'Product Extension', 'Product Update', 'New Packaging'];
  readonly LOCATIONS = ['Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Kolkata'];
  readonly REQUESTORS = ['Priya Sharma', 'Rahul Verma', 'Anjali Mehta', 'Vikram Singh', 'Rohit Kumar', 'Neha Gupta', 'Arjun Patel', 'Sunita Rao'];
  readonly STAGES = ['Product Management Approval', 'Trade Compliance Approval', 'Logistics Approval', 'Operation Approval', 'TCO Approval'];

  // Computed filtered requestors for search
  readonly filteredRequestors = computed(() => {
    const search = this.tempFilterRequestorSearch().toLowerCase();
    if (!search) return this.REQUESTORS;
    return this.REQUESTORS.filter(r => r.toLowerCase().includes(search));
  });

  // Active filter count
  readonly activeFilterCount = computed(() => {
    let count = 0;
    if (this.filterReqTitle()) count++;
    if (this.filterReqType()) count++;
    if (this.filterLocation()) count++;
    if (this.filterRequestor()) count++;
    if (this.filterStage()) count++;
    return count;
  });

  // Check if any items are selected
  readonly hasSelectedItems = computed(() => this.selectedItems().size > 0);

  readonly filtered = computed(() => {
    const s   = this.search().toLowerCase();
    const st  = this.filterStatus();
    const tp  = this.filterType();
    const myOnly = this.myRequestsOnly();
    const currentUser = 'Priya Sharma'; // Current logged-in user
    
    // Modal filters
    const reqTitle = this.filterReqTitle().toLowerCase();
    const reqType = this.filterReqType();
    const location = this.filterLocation();
    const requestor = this.filterRequestor();
    const stage = this.filterStage();
    
    return this.allRequests.filter(r =>
      (st === 'All' || r.status === st) &&
      (tp === 'All' || r.type === tp) &&
      (!s || r.id.toLowerCase().includes(s) || r.title.toLowerCase().includes(s) || r.requestor.toLowerCase().includes(s)) &&
      (!myOnly || r.requestor === currentUser) &&
      (!reqTitle || r.title.toLowerCase().includes(reqTitle)) &&
      (!reqType || r.type === reqType) &&
      (!location || r.site === location) &&
      (!requestor || r.requestor === requestor) &&
      (!stage || r.stage === stage)
    );
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize())));
  readonly pageRows   = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });
  readonly totalCount = computed(() => this.allRequests.length);
  readonly showCount  = computed(() => this.filtered().length);
  readonly pages      = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  showAddDropdown     = signal(false);
  openRowDropdown     = signal<string | null>(null);

  readonly ROW_DROPDOWN_OPTS = [
    'Product Update',
    'Product Extension',
    'Packaging Update',
    'Product Obsolescence (Discontinuation)',
  ];

  constructor(private router: Router) {}

  setPage(p: number)   { this.currentPage.set(p); }
  prevPage()           { if (this.currentPage() > 1) this.currentPage.update(v => v - 1); }
  nextPage()           { if (this.currentPage() < this.totalPages()) this.currentPage.update(v => v + 1); }
  onSearch(v: string)  { this.search.set(v); this.currentPage.set(1); }
  onStatus(v: string)  { this.filterStatus.set(v); this.currentPage.set(1); }
  onType(v: string)    { this.filterType.set(v); this.currentPage.set(1); }
  
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
      this.pageRows().forEach(r => selected.add(r.id));
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
      // TODO: Implement actual delete logic
      console.log('Deleting items:', Array.from(this.selectedItems()));
      this.selectedItems.set(new Set());
      this.toastService.success(`${count} item(s) deleted successfully!`);
    }
  }

  toggleAddDropdown() { this.showAddDropdown.set(!this.showAddDropdown()); }
  toggleRowDropdown(id: string, event: Event) { event.stopPropagation(); this.openRowDropdown.set(this.openRowDropdown() === id ? null : id); }
  closeRowDropdown() { this.openRowDropdown.set(null); }

  // Filter modal methods
  openFilterModal() { 
    // Copy current filter values to temp values when opening modal
    this.tempFilterReqTitle.set(this.filterReqTitle());
    this.tempFilterReqType.set(this.filterReqType());
    this.tempFilterLocation.set(this.filterLocation());
    this.tempFilterRequestor.set(this.filterRequestor());
    this.tempFilterRequestorSearch.set(this.filterRequestor());
    this.tempFilterStage.set(this.filterStage());
    this.showFilterModal.set(true); 
  }
  closeFilterModal() { this.showFilterModal.set(false); }
  
  clearFilters() {
    // Clear temp values
    this.tempFilterReqTitle.set('');
    this.tempFilterReqType.set('');
    this.tempFilterLocation.set('');
    this.tempFilterRequestor.set('');
    this.tempFilterRequestorSearch.set('');
    this.tempFilterStage.set('');
    
    // Clear actual filter values
    this.filterReqTitle.set('');
    this.filterReqType.set('');
    this.filterLocation.set('');
    this.filterRequestor.set('');
    this.filterStage.set('');
    
    // Close the modal
    this.showFilterModal.set(false);
    this.currentPage.set(1);
  }
  
  applyFilters() {
    // Apply temp values to actual filters
    this.filterReqTitle.set(this.tempFilterReqTitle());
    this.filterReqType.set(this.tempFilterReqType());
    this.filterLocation.set(this.tempFilterLocation());
    this.filterRequestor.set(this.tempFilterRequestor());
    this.filterStage.set(this.tempFilterStage());
    this.closeFilterModal();
    this.currentPage.set(1);
  }
  
  selectRequestor(requestor: string) {
    this.tempFilterRequestor.set(requestor);
    this.tempFilterRequestorSearch.set(requestor);
    this.filterRequestorOpen.set(false);
  }
  
  clearRequestor() {
    this.tempFilterRequestor.set('');
    this.tempFilterRequestorSearch.set('');
  }
  
  onRequestorBlur() {
    setTimeout(() => this.filterRequestorOpen.set(false), 160);
  }

  openRequest(r: Request) { this.closeRowDropdown(); this.router.navigate(['/requests', r.id, 'summary']); }
  addNew(type: string)    { this.showAddDropdown.set(false); this.router.navigate(['/requests/new/step1'], { queryParams: { type } }); }

  onQuickSelect(value: string) {
    if (!value) return;
    
    const today = new Date();
    let from = new Date();
    let to = new Date();

    switch(value) {
      case 'today':
        from = to = today;
        break;
      case 'yesterday':
        from = to = new Date(today.setDate(today.getDate() - 1));
        break;
      case 'last-7-days':
        from = new Date(today.setDate(today.getDate() - 7));
        to = new Date();
        break;
      case 'last-30-days':
        from = new Date(today.setDate(today.getDate() - 30));
        to = new Date();
        break;
      case 'this-month':
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'last-month':
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        to = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'this-quarter':
        const quarter = Math.floor(today.getMonth() / 3);
        from = new Date(today.getFullYear(), quarter * 3, 1);
        to = new Date(today.getFullYear(), (quarter + 1) * 3, 0);
        break;
      case 'this-year':
        from = new Date(today.getFullYear(), 0, 1);
        to = new Date(today.getFullYear(), 11, 31);
        break;
    }

    const formatDate = (d: Date) => {
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      return `${month}/${day}/${year}`;
    };

    this.fromDate.set(formatDate(from));
    this.toDate.set(formatDate(to));
  }

  async exportToXLSX() {
    this.isExporting.set(true);
    
    // Simulate export process (replace with actual XLSX export logic)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create CSV data (you can use a library like xlsx for actual Excel export)
    const data = this.filtered();
    const headers = ['Request ID', 'Title', 'Type', 'Site', 'Requestor', 'Date', 'Stage', 'Status', 'Priority'];
    const csvContent = [
      headers.join(','),
      ...data.map(r => [
        r.id,
        `"${r.title}"`,
        `"${r.type}"`,
        r.site,
        r.requestor,
        r.date,
        r.stage || '-',
        r.status,
        r.priority
      ].join(','))
    ].join('\n');
    
    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bmoc-requests-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    this.isExporting.set(false);
    this.toastService.success('Requests exported successfully!');
  }
}

