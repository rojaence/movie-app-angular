import { Component, Input } from '@angular/core';
import { MediaCarouselModule } from '../../../modules/media-carousel/media-carousel.module';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { IImageGallery, IImageResource, MediaTypeToggleItem } from '../../../models/interfaces';
import { MovieService } from '../../../services/movie.service';
import { TvService } from '../../../services/tv.service';
import { finalize } from 'rxjs';
import { CardSkeletonComponent } from '../../../components/card-skeleton/card-skeleton.component';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-media-gallery',
  standalone: true,
  imports: [ MediaCarouselModule, CommonModule, MatButtonToggleModule, CardSkeletonComponent, FormsModule ],
  templateUrl: './media-gallery.component.html',
  styleUrl: './media-gallery.component.scss'
})
export class MediaGalleryComponent {
  @Input() mediaType: 'movie' | 'tv' = 'movie';
  @Input() mediaId: number = 0;
  loading = true;

  logos: IImageResource[] = [];
  backdrops: IImageResource[] = [];
  posters: IImageResource[] = [];

  galleryTypes: MediaTypeToggleItem<'backdrop'| 'poster' | 'video' >[] = [
    {
      value: 'backdrop',
      viewValue: 'Backdrops'
    },
    {
      value: 'poster',
      viewValue: 'Posters'
    }
  ]

  selectedGalleryType: 'backdrop' | 'poster' = "backdrop";

  constructor(
    private movieService: MovieService,
    private tvService: TvService
  ) {}

  ngOnInit() {
    console.log('inicio de gallery')
    this.fetchData();
  }

  fetchData() {
    if (this.mediaType === 'movie') {
      this.movieService.getImageGallery(this.mediaId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (value) => {
          this.backdrops = value.backdrops;
          this.logos = value.logos;
          this.posters = value.posters;
        },
        error(err) {
          console.log(err)
        },
      })
    }
    if (this.mediaType === 'tv') {
      this.tvService.getImageGallery(this.mediaId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (value) => {
          this.backdrops = value.backdrops;
          this.logos = value.logos;
          this.posters = value.posters;
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }

  getImageUri(path: string) {
    return `${environment.imageCdn}/w300${path}`;
  }

}
