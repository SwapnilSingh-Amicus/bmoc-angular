import { Component, signal, computed, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucidePlus, LucideX, LucideMinus, LucideDownload, LucideTrash2, LucideSearch } from '@lucide/angular';
import {
  REASON_CODES, SITES, TOP_FAMILIES,
  FAMILIES, CATEGORIES, ITEM_TYPES, PRIORITIES, PRODUCT_LINES, PRODUCT_FAMILY_GROUPS, PRODUCT_FAMILIES, PROFIT_CENTERS,
} from '../../../../core/constants/app.constants';
import { ToastService } from '../../../../core/services/toast.service';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';

@Component({
  selector: 'app-new-request-step1',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePlus, LucideX, LucideMinus, LucideDownload, LucideTrash2, LucideSearch, DatePickerComponent],
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
  itemReferenceNumber = signal('');
  showItemReferenceLookup = signal(false);
  itemReferenceSearch = signal('');
  attachments = signal<{file: File, comment: string, uploadedBy: string, uploadedDate: string}[]>([]);

  readonly itemReferenceLookupData = signal([
    { sapMaterialNumber: '3014730', materialDescription: 'FCC CP 5 COMB.PROM.', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3018529', materialDescription: 'FCC CP 3 COMB.PROMOTER FB', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3029754', materialDescription: 'SYLOPOL 956 BIGBAG/P 408.2 KG', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3050231', materialDescription: 'SF/MS 5011 S/H BB/P 800 [2]', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3072233', materialDescription: 'VERSUCH SEPARATIONS 317 [2]', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3078294', materialDescription: '9/MS-13/1.30W 800# SACK', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3079312', materialDescription: 'MAGNAPORE 963 800# SACK BIGBAG/P 362.9KG', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3086270', materialDescription: '9/MS-13/1.20W 800# SACK', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100161', materialDescription: '9/2/SG 359 SL44 60 KG', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100493', materialDescription: '9/LD5 BLENDER - BAG 7ML ON PALLET TRAY', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100494', materialDescription: '9/LD5 BLENDER - GREEN DRUM 56 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100495', materialDescription: '9/LD5 BLENDER - BLACK STEEL DRUM 55 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100501', materialDescription: '9/521 WIP-5 GREEN DRUM 56 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100502', materialDescription: '9/521 WIP-5 BLACK STEEL DRUM 55 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100504', materialDescription: '9/522 WIP-4 GREEN DRUM 56 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100505', materialDescription: '9/513 WIP-5 GREEN DRUM 56 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100506', materialDescription: '9/514 WIP-5 GREEN DRUM 56 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100507', materialDescription: '9/542SYN GREEN DRUM 56 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100518', materialDescription: '9/GRACE KAOLIN - BULK', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100527', materialDescription: '9/SODIUM SILICATE', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100528', materialDescription: '9/RE-101', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100529', materialDescription: '9/VANADYL OXALATE (TOTE)', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100542', materialDescription: '9/RANEY 2400-200', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100573', materialDescription: '9/RANEY 3110-200', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100652', materialDescription: '9/RANEY 2400-20', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100683', materialDescription: '9/B 408 SILICA GEL BEADS', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100684', materialDescription: '9/B 411CG - GARDNER-OBSOLETE', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100685', materialDescription: '9/MS-25, MILLED SK', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100688', materialDescription: '9/MI-386 BULK', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100689', materialDescription: '9/MI-486 BULK', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100690', materialDescription: '9/MI-307 BULK', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100691', materialDescription: '9/MI-407 BULK', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100693', materialDescription: '9/W-500', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100695', materialDescription: '9/W-300', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100696', materialDescription: '9/GRADE 653XWP 5 KG/PL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100697', materialDescription: '9/115HP PLANT', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100698', materialDescription: '9/210HP PLANT', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100699', materialDescription: '9/215 HP PLANT', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100700', materialDescription: '9/640 PLANT', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100701', materialDescription: '9/110N PLANT', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100702', materialDescription: '9/633AT PLANT', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100703', materialDescription: '9/623 PLANT', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100704', materialDescription: '9/MS 544 8-12 Beads / 1800 LB SS', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100762', materialDescription: 'OLEFINSMAX 1800# SACK', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100776', materialDescription: '9/OMAX40-OBC', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100777', materialDescription: '9/OMAX40-OBC 1800# SACK', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100802', materialDescription: '9/SRA200-HC', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100814', materialDescription: '9/C-556(NA)', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100826', materialDescription: '9/RD HYDROGEL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100827', materialDescription: '9/10XX HYDROGEL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100828', materialDescription: '9/HFE ID HYDROGEL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100829', materialDescription: '9/AR HYDROGEL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100830', materialDescription: '9/63X-HYDROGEL/703', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100831', materialDescription: '9/ORANGE TAG HYDROGEL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100832', materialDescription: '9/W-GRADES HYDROGEL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100833', materialDescription: 'ID HYDROGEL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100834', materialDescription: '9/GENESIS - AS IS BASIS', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100835', materialDescription: '9/TRISYL HYDROGEL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100836', materialDescription: '9/95C WIP', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100837', materialDescription: '9/72A WIP', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100838', materialDescription: '9/SYLOPORE WIP', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100839', materialDescription: '9/HI TI SYL WIP', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100841', materialDescription: '9/XPO 2412', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100842', materialDescription: '9/SD359 X2112 - XPO 2114', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100845', materialDescription: '9/544B FROM CHROGEL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100846', materialDescription: '9/POLY HYDROGEL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100847', materialDescription: '9/SYLOPORE BEADS', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100848', materialDescription: '9/SYLOPORE HI TI', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100883', materialDescription: '9/HFE AR FD', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100884', materialDescription: '9/HFE ID FD', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100900', materialDescription: '9/LD-5 TOTES', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100901', materialDescription: '9/542SYN STEEL DRUM 10 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100908', materialDescription: '9/513 WIP-5 STEEL DRUM 10 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100909', materialDescription: '9/514 WIP-5 STEEL DRUM 55 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100910', materialDescription: '9/521 WIP-5 STEEL DRUM 10 GAL', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100911', materialDescription: '9/522 WIP-4 Steel Drum 10 gal', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100912', materialDescription: '9/551 BINS', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100913', materialDescription: '9/544 WIP-5', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100920', materialDescription: '9/ZN-1 BASE', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100966', materialDescription: '9/09 DMC', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100969', materialDescription: '9/BG 175-X2 WIP', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100980', materialDescription: '9/C03/009', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100988', materialDescription: '9/SU 647', materialType: 'NULL', site: '' },
    { sapMaterialNumber: '3100989', materialDescription: '9/C 307', materialType: 'NULL', site: '' },
  ].map((row, index) => ({ ...row, site: this.sites[index % this.sites.length] ?? '' })));

  readonly filteredItemReferenceLookupData = computed(() => {
    const q = this.itemReferenceSearch().trim().toLowerCase();
    if (!q) return this.itemReferenceLookupData();
    return this.itemReferenceLookupData().filter(r =>
      r.sapMaterialNumber.toLowerCase().includes(q) ||
      r.materialDescription.toLowerCase().includes(q)
    );
  });
  
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

  toggleItemReferenceLookup(event?: Event) {
    event?.stopPropagation();
    this.showItemReferenceLookup.set(!this.showItemReferenceLookup());
  }

  selectItemReference(row: { sapMaterialNumber: string }) {
    this.itemReferenceNumber.set(row.sapMaterialNumber);
    this.showItemReferenceLookup.set(false);
  }

  @HostListener('document:click', ['$event'])
  closeItemReferenceLookupOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('.item-reference-lookup')) return;
    this.showItemReferenceLookup.set(false);
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
