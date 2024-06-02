import { Component } from '@angular/core';
import { SkeletonComponent } from '../../../components/skeleton/skeleton.component';

@Component({
  selector: 'app-media-info-skeleton',
  standalone: true,
  imports: [ SkeletonComponent ],
  templateUrl: './media-info-skeleton.component.html',
  styleUrl: './media-info-skeleton.component.scss'
})
export class MediaInfoSkeletonComponent {

}
