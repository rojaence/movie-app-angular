import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IMediaCard } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MediaTypeChipComponent } from '../media-type-chip/media-type-chip.component';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatTooltipModule, MediaTypeChipComponent],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.scss'
})
export class MediaCardComponent {
  @Input({required: true}) data!: IMediaCard;
  /* bgColorClass() {
    return `media-card__type--${this.data.mediaType}`;
  } */
}
