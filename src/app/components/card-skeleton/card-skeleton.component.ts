import { Component } from '@angular/core';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div class="card-skeleton">
      <app-skeleton [height]="height" />
      <app-skeleton height="30" width="150" />
    </div>
  `,
  styles: `
    .card-skeleton {
      width: 250px;
      height: 400px;
      box-sizing: border-box;
      padding: .4rem;
      display: flex;
      flex-direction: column;
      gap: .5rem
    }
  `
})
export class CardSkeletonComponent {
  height = 355.81
}
