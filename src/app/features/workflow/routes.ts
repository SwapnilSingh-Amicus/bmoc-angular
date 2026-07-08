import { Routes } from '@angular/router';

export const WORKFLOW_ROUTES: Routes = [
  { path: '', redirectTo: 'task-master', pathMatch: 'full' },
  {
    path: 'task-master',
    loadComponent: () =>
      import('./pages/task-master/task-master.component').then(m => m.TaskMasterComponent),
  },
  {
    path: 'task-master/create',
    loadComponent: () =>
      import('./pages/create-task/create-task.component').then(m => m.CreateTaskComponent),
  },
];
