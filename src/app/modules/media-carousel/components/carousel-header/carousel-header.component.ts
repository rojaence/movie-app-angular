import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-header',
  templateUrl: './carousel-header.component.html',
  styleUrl: './carousel-header.component.scss'
})
export class CarouselHeaderComponent {
  @Input() title: string = "";
  @Input() titleAccent: string = "";
  @Input() contentLink: string = "";
  @Input() contentLinkText: string = "see more";
}
