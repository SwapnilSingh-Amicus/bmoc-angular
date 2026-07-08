import { Component, Input, Output, EventEmitter, signal, computed, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Input() placeholder = 'mm/dd/yyyy';
  @Input() value: string = '';
  @Input() alignRight: boolean = false; // Allow manual control of alignment
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('calendarElement') calendarElement?: ElementRef;
  
  private elementRef = ElementRef;
  
  constructor(private el: ElementRef) {}
  
  isOpen = signal(false);
  currentMonth = signal(new Date());
  selectedDate = signal<Date | null>(null);
  shouldAlignRight = signal(false);
  
  readonly monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  readonly dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
  readonly displayValue = computed(() => {
    const date = this.selectedDate();
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  });

  readonly calendarHeader = computed(() => {
    const date = this.currentMonth();
    return `${this.monthNames[date.getMonth()]}, ${date.getFullYear()}`;
  });

  readonly calendarDays = computed(() => {
    const date = new Date(this.currentMonth());
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    // Adjust so Monday = 0
    let firstDayOfWeek = firstDay.getDay() - 1;
    if (firstDayOfWeek === -1) firstDayOfWeek = 6;
    
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days: Array<{ date: number; isCurrentMonth: boolean; fullDate: Date; isToday: boolean; isSelected: boolean }> = [];
    
    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push({
        date: day,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, day),
        isToday: false,
        isSelected: false
      });
    }
    
    // Current month days
    const today = new Date();
    const selected = this.selectedDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day);
      const isToday = fullDate.toDateString() === today.toDateString();
      const isSelected = selected ? fullDate.toDateString() === selected.toDateString() : false;
      
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate,
        isToday,
        isSelected
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, day),
        isToday: false,
        isSelected: false
      });
    }
    
    return days;
  });

  toggleCalendar() {
    const willBeOpen = !this.isOpen();
    this.isOpen.set(willBeOpen);
    
    if (willBeOpen) {
      // If manual alignment is set, use it
      if (this.alignRight) {
        this.shouldAlignRight.set(true);
        return;
      }
      
      // Otherwise, auto-detect based on viewport position
      setTimeout(() => {
        const wrapper = this.el.nativeElement.querySelector('.date-picker-wrapper');
        
        if (wrapper) {
          const rect = wrapper.getBoundingClientRect();
          const calendarWidth = 320; // max-width of calendar
          const viewportWidth = window.innerWidth;
          
          // If calendar would extend beyond viewport (with 20px margin), align it to the right
          if (rect.left + calendarWidth > viewportWidth - 20) {
            this.shouldAlignRight.set(true);
          } else {
            this.shouldAlignRight.set(false);
          }
        }
      }, 10);
    }
  }

  closeCalendar() {
    this.isOpen.set(false);
  }

  selectDate(day: any) {
    this.selectedDate.set(day.fullDate);
    this.valueChange.emit(this.displayValue());
    this.closeCalendar();
  }

  prevMonth() {
    const current = this.currentMonth();
    this.currentMonth.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  }

  nextMonth() {
    const current = this.currentMonth();
    this.currentMonth.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  }

  clearDate() {
    this.selectedDate.set(null);
    this.valueChange.emit('');
    this.closeCalendar();
  }

  setToday() {
    this.selectedDate.set(new Date());
    this.valueChange.emit(this.displayValue());
    this.closeCalendar();
  }
}
