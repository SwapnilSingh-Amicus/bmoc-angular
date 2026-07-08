import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../models/app.models';
import { 
  LucideLayoutDashboard, 
  LucideClipboardList, 
  LucideCheckSquare, 
  LucideBookOpen, 
  LucideBarChart2,
  LucideGitBranch,
  LucideChevronRight 
} from '@lucide/angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    RouterLinkActive,
    LucideLayoutDashboard,
    LucideClipboardList,
    LucideCheckSquare,
    LucideBookOpen,
    LucideBarChart2,
    LucideGitBranch,
    LucideChevronRight
  ],
  host: {
    '[class.sidebar--collapsed]': 'collapsed()'
  },
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  collapsed = signal(true);
  
  navItems: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'requests', label: 'Requests', route: '/requests/list', id: 'nav-requests' },
    { icon: 'workflow', label: 'Workflow', route: '/workflow', id: 'nav-workflow' },
    { icon: 'tasks', label: 'Tasks', route: '/tasks', id: 'nav-tasks' },
    {
      icon: 'masters', label: 'Master Data', route: null, id: 'nav-masters',
      children: [
        { label: 'Business', route: '/masters/business' },
        { label: 'Location', route: '/masters/location' }
      ]
    },
    {
      icon: 'reports', label: 'Reports', route: null, id: 'nav-reports',
      children: [
        { label: 'Cycle Time', route: '/reports/cycle-time' },
        { label: 'Summary Stats', route: '/reports/summary-stats' }
      ]
    },
  ];

  expandedGroups = signal<Set<string>>(new Set(['Requests', 'Master Data']));

  @HostListener('mouseenter')
  onMouseEnter() {
    this.collapsed.set(false);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.collapsed.set(true);
  }

  toggleExpand(label: string) {
    this.expandedGroups.update(s => {
      const copy = new Set(s);
      if (copy.has(label)) copy.delete(label);
      else copy.add(label);
      return copy;
    });
  }

  isExpanded(label: string): boolean {
    return this.expandedGroups().has(label);
  }
}
