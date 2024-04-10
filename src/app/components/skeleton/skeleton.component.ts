import { Component, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

interface ISkeletonStyle {
  height: number | string,
  width: number | string
}

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [NgClass, NgStyle],
  template: `
    <div class="skeleton" [style]="skeletonStyle" [ngClass]="customClass"></div>
  `,
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {
  @Input() height: number | string = '1rem';
  @Input() width: number | string = '100%';
  @Input() customClass: string = "";

  skeletonStyle: ISkeletonStyle = {
    height: this.height,
    width: this.width
  };

  formatStringValue(value: string | number): string | number {
    let reg = /^\d+$/g;
    if (typeof value === 'number') {
      return `${value}px`;
    } else if (typeof value === 'string' && reg.test(value)) {
      return `${parseInt(value)}px`;
    } else {
      return value;
    }
  }

  ngOnInit(): void {
    this.skeletonStyle = {
      height: this.formatStringValue(this.height),
      width: this.formatStringValue(this.width)
     }
  }
}
