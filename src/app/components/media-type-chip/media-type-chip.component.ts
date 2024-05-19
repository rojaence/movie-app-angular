import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MediaTypeEnum } from '../../models/enums';

@Component({
  selector: 'app-media-type-chip',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './media-type-chip.component.html',
  styleUrl: './media-type-chip.component.scss'
})
export class MediaTypeChipComponent {
  @Input() mediaType: MediaTypeEnum = MediaTypeEnum.movie;

  bgColorClass() {
    return `chip--${this.mediaType}`;
  }
}
