import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cycle-time',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-body">
      <div class="page-heading-row" style="margin-bottom:14px">
        <h2 style="font-size:28px;font-weight:700;color:#15273f;margin:0">Cycle Time Report</h2>
      </div>
      <div class="widget" style="padding:60px;text-align:center;color:#77858c">
        <p>This report module is coming soon.</p>
      </div>
    </div>
  `,
  styles: [`.page-heading-row{display:flex;align-items:center;justify-content:space-between}`]
})
export class CycleTimeComponent {}
