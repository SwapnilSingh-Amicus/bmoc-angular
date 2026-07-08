import { Component, signal, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAlertTriangle, LucideChevronDown, LucideGlobe } from '@lucide/angular';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, LucideAlertTriangle, LucideChevronDown, LucideGlobe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class TopBarComponent {
  userOpen = signal(false);
  moduleOpen = signal(false);
  langOpen = signal(false);

  @ViewChild('header', { read: ElementRef }) headerElement: ElementRef | undefined;

  toggleUser() {
    this.userOpen.set(!this.userOpen());
    this.moduleOpen.set(false);
    this.langOpen.set(false);
  }

  toggleModule() {
    this.moduleOpen.set(!this.moduleOpen());
    this.userOpen.set(false);
    this.langOpen.set(false);
  }

  toggleLang() {
    this.langOpen.set(!this.langOpen());
    this.userOpen.set(false);
    this.moduleOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const headerElement = document.querySelector('header.top-bar');
    
    if (headerElement && !headerElement.contains(target)) {
      this.userOpen.set(false);
      this.moduleOpen.set(false);
      this.langOpen.set(false);
    }
  }
}
