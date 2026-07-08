import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucidePlus, LucideTrash2, LucideUser, LucideEdit, LucideX, LucideCheck } from '@lucide/angular';
import { INITIAL_WF_STAGES } from '../../../../core/constants/app.constants';
import { WorkflowStage, WorkflowTask } from '../../../../core/models/app.models';

@Component({
  selector: 'app-new-request-step2',
  standalone: true,
  imports: [CommonModule, LucidePlus, LucideTrash2, LucideUser, LucideEdit, LucideX, LucideCheck],
  templateUrl: './new-request-step2.component.html',
  styleUrls: ['./new-request-step2.component.scss'],
})
export class NewRequestStep2Component {
  
  
  
  
  
  

  readonly stages = signal<WorkflowStage[]>(JSON.parse(JSON.stringify(INITIAL_WF_STAGES)));

  editTaskModal = signal<WorkflowTask | null>(null);
  newTaskModal  = signal<WorkflowStage | null>(null);
  addUserModal  = signal<WorkflowTask | null>(null);
  isSubmitting  = signal(false);
  showSuccess   = signal(false);

  constructor(private router: Router) {}

  goBack() { this.router.navigate(['/requests/new/step1']); }

  openEdit(t: WorkflowTask) { this.editTaskModal.set({ ...t }); }
  saveEdit(val: string) {
    const t = this.editTaskModal();
    if (!t) return;
    this.stages.update(stgs => stgs.map(s => ({ ...s, tasks: s.tasks.map(x => x.id === t.id ? { ...x, title: val } : x) })));
    this.editTaskModal.set(null);
  }

  deleteTask(tId: number) {
    this.stages.update(stgs => stgs.map(s => ({ ...s, tasks: s.tasks.filter(x => x.id !== tId) })));
  }

  openNewTask(s: WorkflowStage) { this.newTaskModal.set(s); }
  saveNewTask(title: string, resp: string, user: string) {
    const s = this.newTaskModal();
    if (!s || !title.trim()) return;
    const t: WorkflowTask = { id: Date.now(), title, responsibility: resp || 'Auto Assigned', user: user || 'Pending' };
    this.stages.update(stgs => stgs.map(stg => stg.id === s.id ? { ...stg, tasks: [...stg.tasks, t] } : stg));
    this.newTaskModal.set(null);
  }

  openAddUser(t: WorkflowTask) { this.addUserModal.set({ ...t }); }
  saveUser(user: string) {
    const t = this.addUserModal();
    if (!t || !user.trim()) return;
    this.stages.update(stgs => stgs.map(s => ({ ...s, tasks: s.tasks.map(x => x.id === t.id ? { ...x, user } : x) })));
    this.addUserModal.set(null);
  }

  submitRequest() {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.showSuccess.set(true);
      setTimeout(() => this.router.navigate(['/requests/list']), 2000);
    }, 1500);
  }
}
