import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrl: './carousel-item.component.scss'
})
export class CarouselItemComponent {
  @ViewChild('template', { static: true }) template!: TemplateRef<HTMLElement>;
}
