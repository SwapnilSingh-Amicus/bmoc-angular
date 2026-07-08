import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
  },
  {
    path: 'requests',
    loadChildren: () =>
      import('./features/requests/routes').then(m => m.REQUESTS_ROUTES),
  },
  {
    path: 'workflow',
    loadChildren: () =>
      import('./features/workflow/routes').then(m => m.WORKFLOW_ROUTES),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/pages/task-listing/task-listing.component').then(m => m.TaskListingComponent),
  },
  {
    path: 'masters',
    loadChildren: () =>
      import('./features/masters/routes').then(m => m.MASTERS_ROUTES),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./features/reports/routes').then(m => m.REPORTS_ROUTES),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/pages/placeholder/placeholder.component').then(m => m.PlaceholderComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
