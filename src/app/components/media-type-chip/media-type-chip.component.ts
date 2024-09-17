import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MediaTypeEnum } from '../../models/enums';
import { MediaTypeToggleItem } from '../../models/interfaces';
import { MEDIA_TYPE_MAP } from '../../constants/common-values';

@Component({
  selector: 'app-media-type-chip',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './media-type-chip.component.html',
  styleUrl: './media-type-chip.component.scss'
})
export class MediaTypeChipComponent {
  @Input() mediaType: MediaTypeEnum = MediaTypeEnum.movie;

  mediaTypeLabels = {
    movie: MEDIA_TYPE_MAP[MediaTypeEnum.movie].viewValue,
    tv: MEDIA_TYPE_MAP[MediaTypeEnum.tv].viewValue,
    person: MEDIA_TYPE_MAP[MediaTypeEnum.person].viewValue
  };

  bgColorClass() {
    return `chip--${this.mediaType}`;
  }
}
