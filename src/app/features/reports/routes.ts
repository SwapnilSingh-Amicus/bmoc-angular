import { Routes } from '@angular/router';

export const REPORTS_ROUTES: Routes = [
  { path: '', redirectTo: 'cycle-time', pathMatch: 'full' },
  {
    path: 'cycle-time',
    loadComponent: () =>
      import('./pages/cycle-time/cycle-time.component').then(m => m.CycleTimeComponent),
  },
  {
    path: 'summary-stats',
    loadComponent: () =>
      import('./pages/summary-stats/summary-stats.component').then(m => m.SummaryStatsComponent),
  },
];
