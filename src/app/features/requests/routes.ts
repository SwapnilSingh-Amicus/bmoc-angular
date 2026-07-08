import { Routes } from '@angular/router';

export const REQUESTS_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/requests-list/requests-list.component').then(m => m.RequestsListComponent),
  },
  {
    path: 'new/step1',
    loadComponent: () =>
      import('./pages/new-request-step1/new-request-step1.component').then(m => m.NewRequestStep1Component),
  },
  {
    path: 'new/tasks',
    loadComponent: () =>
      import('./pages/request-tasks/request-tasks.component').then(m => m.RequestTasksComponent),
  },
  {
    path: 'new/item-details',
    loadComponent: () =>
      import('./pages/item-details/item-details.component').then(m => m.ItemDetailsComponent),
  },
  {
    path: 'new/step2',
    loadComponent: () =>
      import('./pages/new-request-step2/new-request-step2.component').then(m => m.NewRequestStep2Component),
  },
  {
    path: ':id/summary',
    loadComponent: () =>
      import('./pages/request-summary/request-summary.component').then(m => m.RequestSummaryComponent),
  },
];
