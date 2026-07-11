import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucidePlus, LucideTrash2, LucideX, LucideCheck, LucideDownload } from '@lucide/angular';
import { BUSINESS_ROLES } from '../../../../core/constants/app.constants';
import { BusinessRole } from '../../../../core/models/app.models';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';

@Component({
  selector: 'app-business-role',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePlus, LucideTrash2, LucideX, LucideCheck, LucideDownload, DatePickerComponent],
  templateUrl: './business-role.component.html',
  styleUrls: ['./business-role.component.scss'],
})
export class BusinessRoleComponent {

  roles     = signal<BusinessRole[]>([...BUSINESS_ROLES]);
  search    = signal('');
  dateRangeStart = signal('');
  dateRangeEnd = signal('');
  showFilterPanel = signal(false);
  myRolesOnly = signal(false);

  editRole  = signal<BusinessRole | null>(null);
  editName  = signal('');
  editDesc  = signal('');
  editDept  = signal('');

  addNewMode = signal(false);
  newName    = signal('');
  newDesc    = signal('');
  newDept    = signal('');

  toast     = signal('');

  selected = signal<Set<string>>(new Set());

  readonly filtered = computed(() => {
    const s = this.search().toLowerCase();
    return this.roles().filter(r => !s || r.name.toLowerCase().includes(s) || r.description.toLowerCase().includes(s) || r.department.toLowerCase().includes(s));
  });

  readonly departments = computed(() => {
    const depts = new Set(this.roles().map(r => r.department));
    return Array.from(depts).sort();
  });

  readonly hasSelection = computed(() => this.selected().size > 0);
  readonly allSelected  = computed(() => this.filtered().length > 0 && this.filtered().every(r => this.selected().has(r.id)));

  isSelected(id: string) { return this.selected().has(id); }

  toggleSelect(id: string) {
    this.selected.update(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selected.set(checked ? new Set(this.filtered().map(r => r.id)) : new Set());
  }

  openEdit(role: BusinessRole) {
    this.editRole.set(role);
    this.editName.set(role.name);
    this.editDesc.set(role.description);
    this.editDept.set(role.department);
  }

  closeEdit() {
    this.editRole.set(null);
    this.editName.set('');
    this.editDesc.set('');
    this.editDept.set('');
  }

  saveEdit() {
    if (!this.editRole()) return;

    const index = this.roles().findIndex(r => r.id === this.editRole()!.id);
    if (index >= 0) {
      this.roles.update(rows => {
        const updated = [...rows];
        updated[index] = {
          ...updated[index],
          name: this.editName(),
          description: this.editDesc(),
          department: this.editDept(),
          updatedOn: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/,/g, ''),
        };
        return updated;
      });
      this.toast.set('Business Role updated successfully');
      setTimeout(() => this.toast.set(''), 3000);
    }
    this.closeEdit();
  }

  deleteSelected() {
    this.roles.update(rows => rows.filter(r => !this.selected().has(r.id)));
    this.selected.set(new Set());
    this.toast.set('Business Roles deleted successfully');
    setTimeout(() => this.toast.set(''), 3000);
  }

  exportData() {
    const csv = [
      ['Business Role Name', 'Description', 'Department', 'Updated On'],
      ...this.filtered().map(r => [r.name, r.description, r.department, r.updatedOn]),
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'business-roles.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  addNewRole() {
    this.addNewMode.set(true);
    this.newName.set('');
    this.newDesc.set('');
    this.newDept.set('');
  }

  closeAddNew() {
    this.addNewMode.set(false);
    this.newName.set('');
    this.newDesc.set('');
    this.newDept.set('');
  }

  saveAddNew() {
    if (!this.newName() || !this.newDept()) {
      this.toast.set('Please fill in required fields');
      setTimeout(() => this.toast.set(''), 3000);
      return;
    }

    const newId = 'BR' + (this.roles().length + 1).toString().padStart(3, '0');
    const today = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/,/g, '');

    this.roles.update(rows => [...rows, {
      id: newId,
      name: this.newName(),
      description: this.newDesc(),
      department: this.newDept(),
      updatedOn: today,
    }]);

    this.toast.set('Business Role added successfully');
    setTimeout(() => this.toast.set(''), 3000);
    this.closeAddNew();
  }

  toggleFilterPanel() {
    this.showFilterPanel.update(v => !v);
  }

  toggleMyRoles(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.myRolesOnly.set(checked);
  }
}
