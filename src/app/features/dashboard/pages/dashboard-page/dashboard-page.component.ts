import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucidePlus, LucideDownload, LucideFilter, LucideCalendar, LucideChevronDown, LucideChevronLeft, LucideChevronRight, LucideX, LucideSearch } from '@lucide/angular';
import {
  DASHBOARD_REQUESTS, statusColor, priorityColor,
} from '../../../../core/constants/app.constants';
import { DashboardRequest } from '../../../../core/models/app.models';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';

interface RegionSlice { label: string; pct: number; color: string; }

const CHART_DATA = [
  { q: 'Q1 2025', dark: 12, teal: 7  },
  { q: 'Q2 2025', dark: 19, teal: 12 },
  { q: 'Q3 2025', dark: 14, teal: 8  },
  { q: 'Q4 2025', dark: 22, teal: 14 },
  { q: 'Q1 2026', dark: 10, teal: 12 },
  { q: 'Q2 2026', dark: 24, teal: 15 },
];

const REGIONS: RegionSlice[] = [
  { label: 'South Asia', pct: 32, color: '#16283e' },
  { label: 'East Asia',  pct: 26, color: '#2795a8' },
  { label: 'Europe',     pct: 16, color: '#e08c00' },
  { label: 'Americas',   pct: 14, color: '#29b931' },
  { label: 'MEA',        pct: 12, color: '#40c8d8' },
];

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePlus, LucideDownload, LucideFilter, LucideCalendar, LucideChevronDown, LucideChevronLeft, LucideChevronRight, LucideX, LucideSearch, DatePickerComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  
  
  
  
  
  
  

  // ── Requests table
  allRequests  = DASHBOARD_REQUESTS;
  myRequestsOnly = signal(false);
  startDate    = signal('');
  endDate      = signal('');
  pageSize     = signal(5);
  currentPage  = signal(1);
  showAddDropdown = signal(false);
  hoveredBar   = signal<string | null>(null);
  showFilterModal = signal(false);
  
  // Filter modal fields
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

  // Filter dropdown options
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

  statusColor  = statusColor;
  priorityColor = priorityColor;

  readonly filtered = computed(() => {
    const myOnly = this.myRequestsOnly();
    const reqTitle = this.filterReqTitle().toLowerCase();
    const reqType = this.filterReqType();
    const location = this.filterLocation();
    const requestor = this.filterRequestor();
    const stage = this.filterStage();
    
    return this.allRequests.filter(r =>
      (!myOnly || r.requestor.includes('Pandey')) &&
      (!reqTitle || r.title.toLowerCase().includes(reqTitle)) &&
      (!reqType || r.type === reqType) &&
      (!location || r.location === location) &&
      (!requestor || r.requestor === requestor) &&
      (!stage || r.stage === stage)
    );
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize())));
  readonly totalCount = computed(() => this.allRequests.length);
  readonly showCount  = computed(() => this.filtered().length);
  readonly pages      = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  readonly pageRows = computed(() => {
    const s = (this.currentPage() - 1) * this.pageSize();
    return this.filtered().slice(s, s + this.pageSize());
  });

  readonly paginationInfo = computed(() => {
    const s = (this.currentPage() - 1) * this.pageSize() + 1;
    const e = Math.min(this.currentPage() * this.pageSize(), this.filtered().length);
    return `${s}-${e} of ${this.filtered().length}`;
  });

  setPage(p: number) { if (p >= 1 && p <= this.totalPages()) this.currentPage.set(p); }
  prevPage()         { this.setPage(this.currentPage() - 1); }
  nextPage()         { this.setPage(this.currentPage() + 1); }

  // ── Bar chart
  readonly chartData = CHART_DATA;
  readonly chartMax  = Math.max(...CHART_DATA.map(d => d.dark + d.teal));
  readonly gridLines = [0, 6, 12, 18, 24];

  barPx(v: number): number { return Math.round((v / 28) * 120); }

  // ── Donut chart
  readonly regions = REGIONS;

  donutGradient(): string {
    let cumulative = 0;
    const stops = this.regions.map(r => {
      const from = cumulative;
      cumulative += r.pct;
      return `${r.color} ${from}% ${cumulative}%`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }

  constructor(private router: Router) {}

  toggleAddDropdown() { this.showAddDropdown.set(!this.showAddDropdown()); }

  openRequest(r: DashboardRequest) { this.router.navigate(['/requests', r.id, 'summary']); }
  addRequest(type: string) {
    this.showAddDropdown.set(false);
    this.router.navigate(['/requests/new/step1'], { queryParams: { type } });
  }

  applyFilters() {
    // Apply temp values to actual filters
    this.filterReqTitle.set(this.tempFilterReqTitle());
    this.filterReqType.set(this.tempFilterReqType());
    this.filterLocation.set(this.tempFilterLocation());
    this.filterRequestor.set(this.tempFilterRequestor());
    this.filterStage.set(this.tempFilterStage());
    this.showFilterModal.set(false);
    this.currentPage.set(1);
  }

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
}
