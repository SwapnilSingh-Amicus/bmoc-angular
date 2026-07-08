import { Routes } from '@angular/router';

export const MASTERS_ROUTES: Routes = [
  { path: '', redirectTo: 'business', pathMatch: 'full' },
  {
    path: 'business',
    loadComponent: () =>
      import('./pages/business-master/business-master.component').then(m => m.BusinessMasterComponent),
  },
  {
    path: 'location',
    loadComponent: () =>
      import('./pages/location-master/location-master.component').then(m => m.LocationMasterComponent),
  },
];
