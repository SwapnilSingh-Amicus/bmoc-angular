import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { TopBarComponent } from './core/layout/header/header.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, TopBarComponent, ToastComponent],
  template: `
    <div class="mobile-only-banner">
      <h2>Desktop Required</h2>
      <p>EAS BMOC is optimised for desktop use.<br>Please open on a screen wider than 768px.</p>
    </div>

    <div class="app-shell">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-top-bar></app-top-bar>
        <router-outlet></router-outlet>
      </div>
    </div>
    
    <app-toast></app-toast>
  `,
})
export class AppComponent {}
