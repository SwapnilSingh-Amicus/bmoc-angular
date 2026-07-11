import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucidePlus, LucideTrash2, LucideX, LucideCheck, LucideDownload } from '@lucide/angular';
import { PROFIT_CENTERS, REASON_CODES, ROLE_MAPPINGS, SITES, WORKFLOW_REQUEST_TYPE_OPTIONS } from '../../../../core/constants/app.constants';
import { RoleMapping } from '../../../../core/models/app.models';

@Component({
  selector: 'app-role-mapping',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePlus, LucideTrash2, LucideX, LucideCheck, LucideDownload],
  templateUrl: './role-mapping.component.html',
  styleUrls: ['./role-mapping.component.scss'],
})
export class RoleMappingComponent {

  readonly requestTypeOptions = WORKFLOW_REQUEST_TYPE_OPTIONS;
  readonly reasonCodeOptions = REASON_CODES;
  readonly siteOptions = SITES;
  readonly profitCenterOptions = PROFIT_CENTERS;

  mappings   = signal<RoleMapping[]>([...ROLE_MAPPINGS]);
  search     = signal('');
  dateRangeStart = signal('');
  dateRangeEnd = signal('');
  showFilterPanel = signal(false);
  myMappingsOnly = signal(false);
  showFilterModal = signal(false);

  filterColumns = {
    businessRole: signal(''),
    user: signal(''),
    requestType: signal(''),
    reasonCode: signal(''),
    location: signal(''),
    business: signal(''),
  };

  editMapping = signal<RoleMapping | null>(null);
  editBusinessRole = signal('');
  editUser = signal('');
  editRequestType = signal('');
  editReasonCode = signal('');
  editLocation = signal('');
  editBusiness = signal('');

  addNewMode = signal(false);
  newBusinessRole = signal('');
  newUser = signal('');
  newRequestType = signal('');
  newReasonCode = signal('');
  newLocation = signal('');
  newBusiness = signal('');
  newRequestTypeMode = signal<'ALL' | 'RequestType'>('ALL');
  newSiteMode = signal<'ALL' | 'Region' | 'Plant'>('ALL');
  newProfitCenterMode = signal<'ALL' | 'Division' | 'ProfitCenter'>('ALL');
  newReasonCodeMode = signal<'ALL' | 'ReasonCode'>('ALL');

  toast = signal('');

  selected = signal<Set<string>>(new Set());

  readonly filtered = computed(() => {
    const s = this.search().toLowerCase();
    return this.mappings().filter(m => !s || 
      m.businessRole.toLowerCase().includes(s) || 
      m.user.toLowerCase().includes(s) || 
      m.requestType.toLowerCase().includes(s) ||
      m.reasonCode.toLowerCase().includes(s) ||
      m.location.toLowerCase().includes(s) ||
      m.business.toLowerCase().includes(s)
    );
  });

  readonly hasSelection = computed(() => this.selected().size > 0);
  readonly allSelected = computed(() => this.filtered().length > 0 && this.filtered().every(m => this.selected().has(m.id)));

  isSelected(id: string) { return this.selected().has(id); }

  toggleSelect(id: string) {
    this.selected.update(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selected.set(checked ? new Set(this.filtered().map(m => m.id)) : new Set());
  }

  openEdit(mapping: RoleMapping) {
    this.editMapping.set(mapping);
    this.editBusinessRole.set(mapping.businessRole);
    this.editUser.set(mapping.user);
    this.editRequestType.set(mapping.requestType);
    this.editReasonCode.set(mapping.reasonCode);
    this.editLocation.set(mapping.location);
    this.editBusiness.set(mapping.business);
  }

  closeEdit() {
    this.editMapping.set(null);
    this.editBusinessRole.set('');
    this.editUser.set('');
    this.editRequestType.set('');
    this.editReasonCode.set('');
    this.editLocation.set('');
    this.editBusiness.set('');
  }

  saveEdit() {
    if (!this.editMapping()) return;

    const index = this.mappings().findIndex(m => m.id === this.editMapping()!.id);
    if (index >= 0) {
      this.mappings.update(rows => {
        const updated = [...rows];
        updated[index] = {
          ...updated[index],
          businessRole: this.editBusinessRole(),
          user: this.editUser(),
          requestType: this.editRequestType(),
          reasonCode: this.editReasonCode(),
          location: this.editLocation(),
          business: this.editBusiness(),
          updatedOn: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/,/g, ''),
        };
        return updated;
      });
      this.toast.set('Role Mapping updated successfully');
      setTimeout(() => this.toast.set(''), 3000);
    }
    this.closeEdit();
  }

  deleteSelected() {
    this.mappings.update(rows => rows.filter(m => !this.selected().has(m.id)));
    this.selected.set(new Set());
    this.toast.set('Role Mappings deleted successfully');
    setTimeout(() => this.toast.set(''), 3000);
  }

  exportData() {
    const csv = [
      ['Business Role', 'User', 'Request Type', 'Reason Code', 'Location', 'Business', 'Updated On'],
      ...this.filtered().map(m => [m.businessRole, m.user, m.requestType, m.reasonCode, m.location, m.business, m.updatedOn]),
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'role-mappings.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  addNewMapping() {
    this.addNewMode.set(true);
    this.newBusinessRole.set('');
    this.newUser.set('');
    this.newRequestTypeMode.set('ALL');
    this.newSiteMode.set('ALL');
    this.newProfitCenterMode.set('ALL');
    this.newReasonCodeMode.set('ALL');
    this.newRequestType.set('ALL');
    this.newReasonCode.set('ALL');
    this.newLocation.set('ALL');
    this.newBusiness.set('ALL');
  }

  closeAddNew() {
    this.addNewMode.set(false);
    this.newBusinessRole.set('');
    this.newUser.set('');
    this.newRequestTypeMode.set('ALL');
    this.newSiteMode.set('ALL');
    this.newProfitCenterMode.set('ALL');
    this.newReasonCodeMode.set('ALL');
    this.newRequestType.set('');
    this.newReasonCode.set('');
    this.newLocation.set('');
    this.newBusiness.set('');
  }

  setNewRequestTypeMode(mode: 'ALL' | 'RequestType') {
    this.newRequestTypeMode.set(mode);
    this.newRequestType.set(mode === 'ALL' ? 'ALL' : '');
  }

  setNewSiteMode(mode: 'ALL' | 'Region' | 'Plant') {
    this.newSiteMode.set(mode);
    this.newLocation.set(mode === 'ALL' ? 'ALL' : mode === 'Plant' ? '' : mode);
  }

  setNewProfitCenterMode(mode: 'ALL' | 'Division' | 'ProfitCenter') {
    this.newProfitCenterMode.set(mode);
    this.newBusiness.set(mode === 'ALL' ? 'ALL' : mode === 'ProfitCenter' ? '' : mode);
  }

  setNewReasonCodeMode(mode: 'ALL' | 'ReasonCode') {
    this.newReasonCodeMode.set(mode);
    this.newReasonCode.set(mode === 'ALL' ? 'ALL' : '');
  }

  toggleFilterPanel() {
    this.showFilterPanel.update(v => !v);
  }

  toggleMyMappings(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.myMappingsOnly.set(checked);
  }

  openFilterModal() {
    this.showFilterModal.set(true);
  }

  closeFilterModal() {
    this.showFilterModal.set(false);
  }

  applyFilters() {
    this.showFilterModal.set(false);
  }

  resetFilters() {
    this.filterColumns.businessRole.set('');
    this.filterColumns.user.set('');
    this.filterColumns.requestType.set('');
    this.filterColumns.reasonCode.set('');
    this.filterColumns.location.set('');
    this.filterColumns.business.set('');
  }

  getDepartments() {
    const depts = new Set(this.mappings().map(m => m.user));
    return Array.from(depts).sort();
  }

  saveAddNew() {
    if (!this.newBusinessRole() || !this.newUser()) {
      this.toast.set('Please fill in required fields');
      setTimeout(() => this.toast.set(''), 3000);
      return;
    }

    const newId = 'RM' + (this.mappings().length + 1).toString().padStart(3, '0');
    const today = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/,/g, '');

    this.mappings.update(rows => [...rows, {
      id: newId,
      businessRole: this.newBusinessRole(),
      user: this.newUser(),
      requestType: this.newRequestType(),
      reasonCode: this.newReasonCode(),
      location: this.newLocation(),
      business: this.newBusiness(),
      updatedOn: today,
    }]);

    this.toast.set('Role Mapping added successfully');
    setTimeout(() => this.toast.set(''), 3000);
    this.closeAddNew();
  }
}
