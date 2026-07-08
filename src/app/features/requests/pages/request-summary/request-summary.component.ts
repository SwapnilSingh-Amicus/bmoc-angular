import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideChevronUp, LucideChevronDown, LucideBell, LucidePrinter, LucideX, LucideFileText, LucideUpload, LucideDownload, LucideTrash2 } from '@lucide/angular';
import { ALL_REQUESTS, ALL_TASKS, AUDIT_ENTRIES, statusColor, priorityColor, stageColor } from '../../../../core/constants/app.constants';
import { Request, Task, AuditEntry } from '../../../../core/models/app.models';
import { ToastService } from '../../../../core/services/toast.service';

interface WorkflowGroup { stage: string; tasks: Task[]; }

@Component({
  selector: 'app-request-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideChevronUp, LucideChevronDown, LucideBell, LucidePrinter, LucideX, LucideFileText, LucideUpload, LucideDownload, LucideTrash2],
  templateUrl: './request-summary.component.html',
  styleUrls: ['./request-summary.component.scss'],
})
export class RequestSummaryComponent implements OnInit {
  private toastService = inject(ToastService);
  
  reqId    = signal('');
  request  = signal<Request | undefined>(undefined);
  tasks    = signal<Task[]>([]);
  audit    = signal<AuditEntry[]>(AUDIT_ENTRIES);

  changeTo   = signal('');
  sectionA   = signal(true); // expanded
  sectionB   = signal(true); // expanded
  sectionD   = signal(true); // expanded - Attachments
  showHistoryModal = signal(false);
  showEmailModal = signal(false);
  emailSent = signal(false);

  // Email form fields
  toTags = signal<string[]>(['rahul.verma@saintgobain.com']);
  ccTags = signal<string[]>(['anjali.mehta@saintgobain.com']);
  emailSubject = signal('EAS BMOC-2024-0045 — Action Required: New Waterproofing Compound WP-250');
  emailBody = signal(`Dear Team,

This is a notification regarding BMOC-2024-0045 — New Waterproofing Compound WP-250 (Bangalore).

Please review the request and complete your assigned tasks at the earliest.

Request Summary: http://qa-enterpriseapproval.za.if.atcsg.net/requestsummary/BMOC-2024-0045

Regards,
Priya Sharma
R&D Requestor — SCC`);
  newToEmail = signal('');
  newCcEmail = signal('');

  attachments = signal([
    { name: 'SDS_WP250_v1.pdf', size: '890 KB', uploadedBy: 'Rahul Verma', date: '10 Jun 2026', comment: '' },
    { name: 'Specification_WP250.docx', size: '340 KB', uploadedBy: 'Priya Sharma', date: '10 Jun 2026', comment: '' }
  ]);

  statusColor   = statusColor;
  priorityColor = priorityColor;
  stageColor    = stageColor;

  readonly workflowGroups = computed<WorkflowGroup[]>(() => {
    const stages = ['Pre Approval', 'Approvals', 'Post Approval'];
    return stages
      .map(stage => ({ stage, tasks: this.tasks().filter(t => t.reqId === this.reqId()) }))
      .filter(g => g.tasks.length > 0);
  });

  readonly WORKFLOW_TASKS = [
    { stage: 'Product Management', name: 'Marketing / Product Mgt', assignedTo: 'Pranjal Pandey', responsibility: 'Marketing or Product Mgt Key Assignee', status: 'Approved' },
    { stage: 'Trade Compliance', name: 'Trade Compliance : HS Code and Licensing requirements', assignedTo: 'Munish Sharma', responsibility: 'Trade compliance', status: 'Assigned' },
    { stage: 'Logistics', name: 'PSS', assignedTo: 'Rahul Sharma', responsibility: 'PSS Coordinators', status: 'Created' },
    { stage: 'Operation', name: 'Safety operational/plant', assignedTo: 'Jayehs Chauhan', responsibility: 'EHS Key Assignee', status: 'Created' },
    { stage: 'Operation', name: 'Quality', assignedTo: 'Sumant Singh', responsibility: 'QC Key Assignee', status: 'Created' },
    { stage: 'TCO', name: 'Formula Annotation', assignedTo: 'John Doe', responsibility: 'TCO', status: 'Created' },
    { stage: 'Automatic ERP Integration', name: 'Automatic ERP Integration', assignedTo: 'Pranjal Pandey', responsibility: 'Requestor', status: 'Created' },
    { stage: 'Final Approval', name: 'Overall product validation', assignedTo: 'Rahul Sharma', responsibility: 'Technical Dir or R&D Mgt Key Assignee', status: 'Created' },
  ];

  readonly STAGES_ORDER = ['Product Management', 'Trade Compliance', 'Logistics', 'Operation', 'TCO', 'Automatic ERP Integration', 'Final Approval'];

  showTaskPopup = signal(false);
  selectedTaskIndex = signal(-1);
  taskDecision = signal<'Approve' | 'Reject' | ''>('');
  taskComment = signal('');
  taskAttachments = signal<File[]>([]);

  getGroupStatus(stage: string) {
    const tasks = this.WORKFLOW_TASKS.filter(t => t.stage === stage);
    if (tasks.every(t => t.status === 'Approved')) return 'Approved';
    if (tasks.some(t => t.status === 'Assigned' || t.status === 'In Progress')) return 'Assigned';
    return 'Created';
  }

  getTasksForStage(stage: string) {
    return this.WORKFLOW_TASKS.filter(t => t.stage === stage);
  }

  openTaskPopup(taskIndex: number) {
    this.selectedTaskIndex.set(taskIndex);
    this.showTaskPopup.set(true);
    this.taskDecision.set('');
    this.taskComment.set('');
    this.taskAttachments.set([]);
  }

  closeTaskPopup() {
    this.showTaskPopup.set(false);
    this.selectedTaskIndex.set(-1);
  }

  navigateToRequestInfo() {
    // Navigate to New MOC Request page (Step 1) for editing
    const reqId = this.reqId();
    this.router.navigate(['/requests/new/step1'], { queryParams: { edit: reqId } });
  }

  onTaskAttachmentSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const filesArray = Array.from(input.files);
      this.taskAttachments.set([...this.taskAttachments(), ...filesArray]);
    }
  }

  submitTaskDecision() {
    const decision = this.taskDecision();
    if (!decision) return;
    
    // Update task status
    const taskIdx = this.selectedTaskIndex();
    if (taskIdx >= 0 && taskIdx < this.WORKFLOW_TASKS.length) {
      if (decision === 'Approve') {
        this.WORKFLOW_TASKS[taskIdx].status = 'Approved';
        
        // Add uploaded attachments to the attachments list if any
        if (this.taskAttachments().length > 0) {
          const currentAttachments = this.attachments();
          const newAttachments = this.taskAttachments().map(file => ({
            name: file.name,
            size: this.formatFileSize(file.size),
            uploadedBy: 'Munish Sharma', // Current user who approved and uploaded
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '),
            comment: ''
          }));
          this.attachments.set([...currentAttachments, ...newAttachments]);
        }
        
        this.toastService.success('Task approved successfully!');
      } else {
        this.WORKFLOW_TASKS[taskIdx].status = 'Rejected';
        this.toastService.success('Task rejected.');
      }
    }
    
    this.closeTaskPopup();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  getSelectedTask() {
    const idx = this.selectedTaskIndex();
    return idx >= 0 ? this.WORKFLOW_TASKS[idx] : null;
  }

  toggleHistoryModal() {
    this.showHistoryModal.set(!this.showHistoryModal());
  }

  closeHistoryModal() {
    this.showHistoryModal.set(false);
  }

  uploadAttachment() {
    console.log('Upload attachment clicked');
    // TODO: Implement file upload
  }
  
  updateAttachmentComment(index: number, comment: string) {
    const atts = this.attachments();
    atts[index].comment = comment;
    this.attachments.set([...atts]);
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

  openEmailModal() {
    this.showEmailModal.set(true);
    this.emailSent.set(false);
  }

  closeEmailModal() {
    this.showEmailModal.set(false);
    this.emailSent.set(false);
  }

  addToTag() {
    const email = this.newToEmail().trim();
    if (email && !this.toTags().includes(email)) {
      this.toTags.set([...this.toTags(), email]);
      this.newToEmail.set('');
    }
  }

  removeToTag(email: string) {
    this.toTags.set(this.toTags().filter(e => e !== email));
  }

  addCcTag() {
    const email = this.newCcEmail().trim();
    if (email && !this.ccTags().includes(email)) {
      this.ccTags.set([...this.ccTags(), email]);
      this.newCcEmail.set('');
    }
  }

  removeCcTag(email: string) {
    this.ccTags.set(this.ccTags().filter(e => e !== email));
  }

  sendEmail() {
    if (this.toTags().length === 0) return;
    this.emailSent.set(true);
    // Show success message for 2 seconds then close
    setTimeout(() => {
      this.closeEmailModal();
      this.toastService.success(`Notification sent to ${this.toTags().length} recipient(s)`);
    }, 2000);
  }

  notify() {
    this.openEmailModal();
  }

  print() {
    window.print();
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || '';
      this.reqId.set(id);
      const req = ALL_REQUESTS.find(r => r.id === id) || ALL_REQUESTS[0];
      this.request.set(req);
      this.tasks.set(ALL_TASKS.filter(t => t.reqId === id));
    });
  }

  backToList() {
    const returnTo = sessionStorage.getItem('returnTo');
    if (returnTo) {
      sessionStorage.removeItem('returnTo');
      this.router.navigate([returnTo]);
    } else {
      this.router.navigate(['/requests/list']);
    }
  }
}
