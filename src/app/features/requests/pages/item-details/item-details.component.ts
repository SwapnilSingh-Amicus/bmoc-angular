import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucidePlus, LucideChevronDown, LucideChevronUp } from '@lucide/angular';

interface Section {
  id: string;
  name: string;
  isExpanded: boolean;
  isEditable: boolean;
}

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePlus, LucideChevronDown, LucideChevronUp],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent {
  activeTab = signal('item-1');
  description1 = signal('');
  description2 = signal('');
  itemRefNumber = signal('');
  
  sections = signal<Section[]>([
    { id: 'general', name: 'General Info', isExpanded: true, isEditable: false },
    { id: 'product', name: 'Product Management', isExpanded: false, isEditable: false },
    { id: 'trade', name: 'Trade Compliance', isExpanded: false, isEditable: false },
    { id: 'logistics', name: 'Logistics', isExpanded: false, isEditable: false },
    { id: 'operation', name: 'Operation', isExpanded: false, isEditable: false },
    { id: 'tco', name: 'TCO', isExpanded: false, isEditable: false },
  ]);

  constructor(private router: Router, private route: ActivatedRoute) {}

  switchTab(tab: string) {
    this.activeTab.set(tab);
  }

  toggleSection(sectionId: string) {
    this.sections.update(sections =>
      sections.map(s => s.id === sectionId ? { ...s, isExpanded: !s.isExpanded } : s)
    );
  }

  enableEdit(sectionId: string) {
    this.sections.update(sections =>
      sections.map(s => s.id === sectionId ? { ...s, isEditable: true } : s)
    );
  }

  saveAsDraft() {
    console.log('Saving as draft...');
    // TODO: Implement save as draft logic
  }

  goToPrevious() {
    this.router.navigate(['../step1'], { relativeTo: this.route });
  }

  goToNext() {
    this.router.navigate(['../step2'], { relativeTo: this.route });
  }

  addNewItem() {
    // TODO: Implement add new item logic
    console.log('Adding new item...');
  }
}
