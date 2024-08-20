import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IMediaCard } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MediaTypeChipComponent } from '../media-type-chip/media-type-chip.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatTooltipModule, MediaTypeChipComponent, MatIconModule],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.scss',
})
export class MediaCardComponent {
  @Input({required: true}) data!: IMediaCard;
  @Input() size: 'small' | 'normal' = 'normal';
}
