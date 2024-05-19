import { Component, Input } from '@angular/core';
import { IMediaInfo } from '../../../models/interfaces';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MediaTypeChipComponent } from '../../../components/media-type-chip/media-type-chip.component';

@Component({
  selector: 'app-media-info',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatButtonModule, MatRippleModule, MediaTypeChipComponent ],
  templateUrl: './media-info.component.html',
  styleUrl: './media-info.component.scss'
})
export class MediaInfoComponent {
  @Input() data!: IMediaInfo;
}
