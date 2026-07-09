import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucidePlus, LucideX, LucideMinus, LucideChevronUp, LucideChevronDown, LucideCheck } from '@lucide/angular';

interface Task {
  title: string;
  responsibility: string;
  user: string;
}

interface TaskGroup {
  name: string;
  expanded: boolean;
  tasks: Task[];
}

@Component({
  selector: 'app-request-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, LucidePlus, LucideX, LucideMinus, LucideChevronUp, LucideChevronDown, LucideCheck],
  templateUrl: './request-tasks.component.html',
  styleUrls: ['./request-tasks.component.scss'],
})
export class RequestTasksComponent {
  
  showSuccessModal = signal(false);
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
Pranjal Panday
R&D Requestor — SCC`);
  newToEmail = signal('');
  newCcEmail = signal('');
  
  taskGroups = signal<TaskGroup[]>([
    {
      name: 'Product Management',
      expanded: true,
      tasks: [
        { title: 'Marketing / Product Mgt', responsibility: 'Marketing or Product Mgt Key Assignee', user: 'Pranjal Pandey' }
      ]
    },
    {
      name: 'Trade Compliance',
      expanded: true,
      tasks: [
        { title: 'Trade Compliance : HS Code and Licensing requirements', responsibility: 'Trade compliance', user: 'Munish Sharma' }
      ]
    },
    {
      name: 'Logistics',
      expanded: true,
      tasks: [
        { title: 'PSS', responsibility: 'PSS Coordinators', user: 'Rahul Sharma' }
      ]
    },
    {
      name: 'Operation',
      expanded: true,
      tasks: [
        { title: 'Safety operational/plant', responsibility: 'EHS Key Assignee', user: 'Jayehs Chauhan' },
        { title: 'Quality', responsibility: 'QC Key Assignee', user: 'Sumant Singh' }
      ]
    },
    {
      name: 'TCO',
      expanded: true,
      tasks: [
        { title: 'Formula Annotation', responsibility: 'TCO', user: 'John Doe' }
      ]
    },
    {
      name: 'Automatic ERP Integration',
      expanded: true,
      tasks: [
        { title: 'Automatic ERP Integration', responsibility: 'Requestor', user: 'Pranjal Pandey' }
      ]
    },
    {
      name: 'Final Approval',
      expanded: true,
      tasks: [
        { title: 'Overall product validation', responsibility: 'Technical Dir or R&D Mgt Key Assignee', user: 'Rahul Sharma' }
      ]
    }
  ]);

  toggleGroup(index: number) {
    const groups = this.taskGroups();
    groups[index].expanded = !groups[index].expanded;
    this.taskGroups.set([...groups]);
  }

  removeGroup(index: number) {
    const groups = this.taskGroups();
    groups.splice(index, 1);
    this.taskGroups.set([...groups]);
  }

  moveGroupUp(index: number) {
    if (index === 0) return;
    const groups = this.taskGroups();
    [groups[index - 1], groups[index]] = [groups[index], groups[index - 1]];
    this.taskGroups.set([...groups]);
  }

  moveGroupDown(index: number) {
    const groups = this.taskGroups();
    if (index === groups.length - 1) return;
    [groups[index], groups[index + 1]] = [groups[index + 1], groups[index]];
    this.taskGroups.set([...groups]);
  }

  removeTask(groupIndex: number, taskIndex: number) {
    const groups = this.taskGroups();
    groups[groupIndex].tasks.splice(taskIndex, 1);
    this.taskGroups.set([...groups]);
  }

  updateUser(groupIndex: number, taskIndex: number, value: string) {
    const groups = this.taskGroups();
    groups[groupIndex].tasks[taskIndex].user = value;
    this.taskGroups.set([...groups]);
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

  addTask() {
    console.log('Add task clicked');
    // TODO: Open add task modal
  }

  saveDraft() {
    console.log('Save as draft');
  }

  previous() {
    this.router.navigate(['/requests/new/step1']);
  }

  next() {
    // Open Outlook with mailto link
    const toEmails = this.toTags().join(';');
    const ccEmails = this.ccTags().join(';');
    const subject = encodeURIComponent(this.emailSubject());
    const body = encodeURIComponent(this.emailBody());
    
    const mailtoLink = `mailto:${toEmails}?cc=${ccEmails}&subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Show success modal immediately
    setTimeout(() => {
      this.showSuccessModal.set(true);
    }, 500);
  }
  
  closeEmailModal() {
    this.showEmailModal.set(false);
    this.emailSent.set(false);
  }
  
  sendEmail() {
    if (this.toTags().length === 0) return;
    this.emailSent.set(true);
    // Show success message for 2 seconds then close and show submit success
    setTimeout(() => {
      this.closeEmailModal();
      this.showSuccessModal.set(true);
    }, 2000);
  }

  viewRequestSummary() {
    this.showSuccessModal.set(false);
    this.router.navigate(['/requests', 'BMOC-2024-0045', 'summary']);
  }

  constructor(private router: Router) {}
}
