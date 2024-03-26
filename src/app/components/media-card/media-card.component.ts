import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IMediaCard } from '../../models/interfaces';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.scss'
})
export class MediaCardComponent {
  @Input({required: true}) data!: IMediaCard;
}
