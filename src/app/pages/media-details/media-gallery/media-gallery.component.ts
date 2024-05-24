import { Component, Input } from '@angular/core';
import { MediaCarouselModule } from '../../../modules/media-carousel/media-carousel.module';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { IImageGallery, IImageResource, IVideoResource, MediaTypeToggleItem } from '../../../models/interfaces';
import { MovieService } from '../../../services/movie.service';
import { TvService } from '../../../services/tv.service';
import { finalize } from 'rxjs';
import { CardSkeletonComponent } from '../../../components/card-skeleton/card-skeleton.component';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { AppRepeatDirective } from '../../../directives/app-repeat.directive';

@Component({
  selector: 'app-media-gallery',
  standalone: true,
  imports: [ MediaCarouselModule, CommonModule, MatButtonToggleModule, CardSkeletonComponent, FormsModule, AppRepeatDirective ],
  templateUrl: './media-gallery.component.html',
  styleUrl: './media-gallery.component.scss'
})
export class MediaGalleryComponent {
  @Input() mediaType: 'movie' | 'tv' = 'movie';
  @Input() mediaId: number = 0;
  loadingImages = true;
  loadingVideos = true;

  logos: IImageResource[] = [];
  backdrops: IImageResource[] = [];
  posters: IImageResource[] = [];
  videos: IVideoResource[] = [];

  galleryTypes: MediaTypeToggleItem<'backdrop'| 'poster' | 'video' >[] = [
    {
      value: 'backdrop',
      viewValue: 'Backdrops'
    },
    {
      value: 'poster',
      viewValue: 'Posters'
    },
    {
      value: 'video',
      viewValue: 'Videos'
    }
  ]

  selectedGalleryType: 'backdrop' | 'poster' | 'video' = "backdrop";

  constructor(
    private movieService: MovieService,
    private tvService: TvService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    if (this.mediaType === 'movie') {
      this.movieService.getImageGallery(this.mediaId)
      .pipe(finalize(() => this.loadingImages = false))
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
      this.movieService.getVideoGallery(this.mediaId)
      .pipe(finalize(() => this.loadingVideos = false))
      .subscribe({
        next: (value) => {
          this.videos = value.results;
        },
        error(err) {
          console.log(err)
        },
      })
    }
    if (this.mediaType === 'tv') {
      this.tvService.getImageGallery(this.mediaId)
      .pipe(finalize(() => this.loadingImages = false))
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

      this.tvService.getVideoGallery(this.mediaId)
      .pipe(finalize(() => this.loadingVideos = false))
      .subscribe({
        next: (value) => {
          this.videos = value.results;
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }

  getImageUri(path: string): string {
    if (this.selectedGalleryType === 'backdrop') {
      return `${environment.imageCdn}/w500${path}`;
    } else {
      return `${environment.imageCdn}/w200${path}`;
    }
  }

}
