import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucidePlus, LucideX, LucideMinus, LucideDownload, LucideTrash2 } from '@lucide/angular';
import {
  REASON_CODES, SITES, TOP_FAMILIES,
  FAMILIES, CATEGORIES, ITEM_TYPES, PRIORITIES, PRODUCT_LINES, PRODUCT_FAMILY_GROUPS, PRODUCT_FAMILIES, PROFIT_CENTERS,
} from '../../../../core/constants/app.constants';
import { ToastService } from '../../../../core/services/toast.service';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';

@Component({
  selector: 'app-new-request-step1',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePlus, LucideX, LucideMinus, LucideDownload, LucideTrash2, DatePickerComponent],
  templateUrl: './new-request-step1.component.html',
  styleUrls: ['./new-request-step1.component.scss'],
})
export class NewRequestStep1Component {
  private toastService = inject(ToastService);

  private readonly experimentalNoErpReason = 'Create New Experimental Product - no ERP creation';
  private readonly experimentalWithErpReason = 'Create New Experimental Product - with ERP creation';
  private readonly reasonCodesByRequestType: Record<string, string[]> = {
    'FINISHED PRODUCT': [
      'P01 - Create a new Product',
      'P08 - Part Fabrication',
    ],
    'RAW MATERIAL': [
      'R01 - Create a new Raw Material',
      'R02 - Create a New Raw Material (Existing RM but for adding a non existing packaging)',
    ],
  };

  readonly reasonCodes = computed(() => {
    const requestType = this.selectedOption();

    if (requestType === 'EXPERIMENTAL PRODUCT - NO ERP CREATION') {
      return [this.experimentalNoErpReason, ...REASON_CODES];
    }

    if (requestType === 'EXPERIMENTAL PRODUCT - WITH ERP CREATION') {
      return [this.experimentalWithErpReason, ...REASON_CODES];
    }

    return this.reasonCodesByRequestType[requestType ?? ''] ?? REASON_CODES;
  });
  readonly priorities    = PRIORITIES;
  readonly sites         = SITES;
  readonly productLines  = PRODUCT_LINES;
  readonly productFamilyGroups = PRODUCT_FAMILY_GROUPS;
  readonly productFamilies     = PRODUCT_FAMILIES;
  readonly profitCenters = PROFIT_CENTERS;
  readonly topFamilies   = TOP_FAMILIES;
  readonly families      = FAMILIES;
  readonly categories    = CATEGORIES;
  readonly allItemTypes  = ITEM_TYPES;

  selectedOption = signal<string | null>(null);
  requestTitle   = signal('');
  reasonCode     = signal('');
  site           = signal('');
  topFamily      = signal('');
  family         = signal('');
  category       = signal('');
  priority       = signal('');
  productLine    = signal('');
  productFamilyGroup = signal('');
  productFamily  = signal('');

  // Tab navigation
  activeTab = signal<'request-info' | string>('request-info');
  itemTabs = signal<string[]>(['Item 1']); // Dynamic item tabs
  isEditMode = signal(false);

  selectedItemType = signal('');
  attachments = signal<{file: File, comment: string, uploadedBy: string, uploadedDate: string}[]>([]);
  
  // Collapsible sections state for each item
  itemSectionsExpanded = signal<{[itemKey: string]: {[section: string]: boolean}}>({
    'Item 1': {
      'generalInfo': true,
      'productManagement': false,
      'tradeCompliance': false,
      'logistics': false,
      'operation': false,
      'tco': false
    }
  });

  itemSectionEditEnabled = signal<{[itemKey: string]: {[section: string]: boolean}}>({
    'Item 1': {
      'productManagement': false,
      'tradeCompliance': false,
      'logistics': false,
      'operation': false,
      'tco': false
    }
  });

  readonly familyList    = computed(() => this.families[this.topFamily()] || []);
  readonly categoryList  = computed(() => this.categories[this.family()] || []);

  onTopFamily(v: string) { this.topFamily.set(v); this.family.set(''); this.category.set(''); }
  onFamily(v: string)    { this.family.set(v); this.category.set(''); }

  // Tab navigation methods
  switchTab(tab: 'request-info' | string) {
    this.activeTab.set(tab);
  }

  // Add new item tab - only enabled when Item Type is selected
  addNewItem() {
    const currentItems = this.itemTabs();
    const newItemNumber = currentItems.length + 1;
    const newItemKey = `Item ${newItemNumber}`;
    this.itemTabs.set([...currentItems, newItemKey]);
    
    // Initialize expanded state for new item
    const currentExpanded = this.itemSectionsExpanded();
    currentExpanded[newItemKey] = {
      'generalInfo': true,
      'productManagement': false,
      'tradeCompliance': false,
      'logistics': false,
      'operation': false,
      'tco': false
    };
    this.itemSectionsExpanded.set({...currentExpanded});
    
    this.activeTab.set(newItemKey);
  }
  
  // Toggle section expansion
  toggleSection(section: string) {
    const currentTab = this.activeTab();
    if (currentTab === 'request-info') return;
    
    const currentExpanded = this.itemSectionsExpanded();
    if (currentExpanded[currentTab]) {
      currentExpanded[currentTab][section] = !currentExpanded[currentTab][section];
      this.itemSectionsExpanded.set({...currentExpanded});
    }
  }
  
  // Check if section is expanded
  isSectionExpanded(section: string): boolean {
    const currentTab = this.activeTab();
    if (currentTab === 'request-info') return false;
    
    const expanded = this.itemSectionsExpanded();
    return expanded[currentTab]?.[section] ?? false;
  }

  isSectionEditable(section: string): boolean {
    const currentTab = this.activeTab();
    if (currentTab === 'request-info') return false;
    const editState = this.itemSectionEditEnabled();
    return editState[currentTab]?.[section] ?? false;
  }

  enableSectionEdit(section: string) {
    const tab = this.activeTab();
    if (tab === 'request-info') return;
    const current = this.itemSectionEditEnabled();
    const updatedTab = { ...(current[tab] || {}), [section]: true };
    this.itemSectionEditEnabled.set({ ...current, [tab]: updatedTab });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files).map(file => ({
        file,
        comment: '',
        uploadedBy: 'Priya Sharma',
        uploadedDate: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '/')
      }));
      this.attachments.set([...this.attachments(), ...newFiles]);
      input.value = ''; // Reset input
    }
  }

  removeAttachment(index: number) {
    const files = this.attachments();
    files.splice(index, 1);
    this.attachments.set([...files]);
  }
  
  updateAttachmentComment(index: number, comment: string) {
    const files = this.attachments();
    files[index].comment = comment;
    this.attachments.set([...files]);
  }
  
  getFileType(filename: string): string {
    const ext = filename.split('.').pop()?.toUpperCase() || '';
    const imageTypes = ['PNG', 'JPG', 'JPEG', 'GIF', 'BMP'];
    const docTypes = ['DOC', 'DOCX'];
    const excelTypes = ['XLS', 'XLSX'];
    
    if (ext === 'PDF') return 'PDF';
    if (imageTypes.includes(ext)) return `Image (.${ext.toLowerCase()})`;
    if (docTypes.includes(ext)) return `Word Document (.${ext.toLowerCase()})`;
    if (excelTypes.includes(ext)) return `Excel (.${ext.toLowerCase()})`;
    return ext;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  formErrors = signal<string[]>([]);

  validate(): boolean {
    const errors: string[] = [];
    if (!this.requestTitle().trim()) errors.push('Request Title is required.');
    if (!this.reasonCode()) errors.push('Reason Code is required.');
    if (!this.site()) errors.push('Site is required.');
    this.formErrors.set(errors);
    return errors.length === 0;
  }

  proceed() { 
    // From Request Info tab: switch to Item 1 tab
    if (this.activeTab() === 'request-info') {
      this.switchTab('Item 1');
      return;
    }
    
    // From Item tab: go to tasks page
    this.router.navigate(['/requests/new/tasks']);
  }
  
  previous() {
    // Only available from Item tabs - go back to Request Info
    this.switchTab('request-info');
  }
  
  saveDraft() {
    this.formErrors.set([]);
    const message = this.isEditMode() ? 'Request saved successfully!' : 'Draft saved successfully!';
    this.toastService.success(message);
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      const isEditRoute = !!params['edit'] || params['mode'] === 'edit';
      this.isEditMode.set(isEditRoute);

      if (params['type']) {
        this.selectedOption.set(params['type']);
        this.reasonCode.set('');
      }
      if (params['edit'] && !params['activeTab']) {
        this.switchTab('Item 1');
      }
      if (params['activeTab']) {
        this.switchTab(params['activeTab']);
      }
    });
  }
}
