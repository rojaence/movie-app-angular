import { Component, Input } from '@angular/core';
import { IMediaInfo } from '../../../models/interfaces';

@Component({
  selector: 'app-media-info',
  standalone: true,
  imports: [],
  templateUrl: './media-info.component.html',
  styleUrl: './media-info.component.scss'
})
export class MediaInfoComponent {
  @Input() data: IMediaInfo | undefined;
}
