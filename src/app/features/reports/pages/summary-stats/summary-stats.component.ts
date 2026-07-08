import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-body">
      <div style="margin-bottom:14px">
        <h2 style="font-size:28px;font-weight:700;color:#15273f;margin:0">Summary Statistics</h2>
      </div>
      <div class="widget" style="padding:60px;text-align:center;color:#77858c">
        <p>This report module is coming soon.</p>
      </div>
    </div>
  `,
})
export class SummaryStatsComponent {}
