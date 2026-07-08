import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucidePlus, LucideTrash2, LucideX, LucideCheck } from '@lucide/angular';
import { BUSINESS_ROWS } from '../../../../core/constants/app.constants';
import { BusinessRow } from '../../../../core/models/app.models';

@Component({
  selector: 'app-business-master',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePlus, LucideTrash2, LucideX, LucideCheck],
  templateUrl: './business-master.component.html',
})
export class BusinessMasterComponent {

  rows   = signal<BusinessRow[]>([...BUSINESS_ROWS]);
  search = signal('');

  editRow    = signal<BusinessRow | null>(null);
  editName   = signal('');
  editStatus = signal('Active');
  toast      = signal('');

  selected = signal<Set<string>>(new Set());

  readonly filtered = computed(() => {
    const s = this.search().toLowerCase();
    return this.rows().filter(r => !s || r.code.toLowerCase().includes(s) || r.name.toLowerCase().includes(s));
  });

  readonly hasSelection = computed(() => this.selected().size > 0);
  readonly allSelected  = computed(() => this.filtered().length > 0 && this.filtered().every(r => this.selected().has(r.code)));

  isSelected(code: string) { return this.selected().has(code); }

  toggleSelect(code: string) {
    this.selected.update(s => { const n = new Set(s); n.has(code) ? n.delete(code) : n.add(code); return n; });
  }

  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selected.set(checked ? new Set(this.filtered().map(r => r.code)) : new Set());
  }

  openEdit(row: BusinessRow) {
    this.editRow.set(row);
    this.editName.set(row.name);
    this.editStatus.set(row.status);
  }

  saveEdit() {
    const row = this.editRow();
    if (!row) return;
    this.rows.update(r => r.map(x => x.code === row.code ? { ...x, name: this.editName(), status: this.editStatus() } : x));
    this.editRow.set(null);
    this.toast.set('Business record saved.');
    setTimeout(() => this.toast.set(''), 3500);
  }

  closeEdit() { this.editRow.set(null); }
}
