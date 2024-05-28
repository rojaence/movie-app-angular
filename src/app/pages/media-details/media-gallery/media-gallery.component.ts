import { Component, Input } from '@angular/core';
import { MediaCarouselModule } from '../../../modules/media-carousel/media-carousel.module';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { IImageResource, IVideoResource, MediaTypeToggleItem } from '../../../models/interfaces';
import { MovieService } from '../../../services/movie.service';
import { TvService } from '../../../services/tv.service';
import { finalize } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { AppRepeatDirective } from '../../../directives/app-repeat.directive';
import { MatIconModule } from '@angular/material/icon';
import { ImageViewerComponent } from '../../../components/image-viewer/image-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { SkeletonComponent } from '../../../components/skeleton/skeleton.component';

@Component({
  selector: 'app-media-gallery',
  standalone: true,
  imports: [ MediaCarouselModule, CommonModule, MatButtonToggleModule, SkeletonComponent, FormsModule, AppRepeatDirective, MatIconModule, ImageViewerComponent ],
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
    private tvService: TvService,
    public dialog: MatDialog
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
          this.backdrops = value.backdrops.slice(0, 20);
          this.logos = value.logos.slice(0, 20);
          this.posters = value.posters.slice(0, 20);
        },
        error(err) {
          console.log(err)
        },
      })
      this.movieService.getVideoGallery(this.mediaId)
      .pipe(finalize(() => this.loadingVideos = false))
      .subscribe({
        next: (value) => {
          this.videos = value.results.slice(0, 20);
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
          this.backdrops = value.backdrops.slice(0, 20);
          this.logos = value.logos.slice(0, 20);
          this.posters = value.posters.slice(0, 20);
        },
        error(err) {
          console.log(err)
        },
      })

      this.tvService.getVideoGallery(this.mediaId)
      .pipe(finalize(() => this.loadingVideos = false))
      .subscribe({
        next: (value) => {
          this.videos = value.results.slice(0, 20);
        },
        error(err) {
          console.log(err)
        },
      })
    }
  }

  getImageUri(path: string, width: number = 300): string {
    const generator = {
      backdrop: () => `${environment.imageCdn}/w${width}${path}`,
      video: () => `${environment.thumbnailVideoBaseUrl}/${path}/hqdefault.jpg`,
      poster: () => `${environment.imageCdn}/w${width}${path}`
    }
    return generator[this.selectedGalleryType]();
  }

  openImageViewer(path: string): void {
    let images: string[] = [];
    let selected = 0;
    if (this.selectedGalleryType === 'backdrop') {
      images = this.backdrops.map(i => `${environment.imageCdn}/original${i.filePath}`)
      selected = this.backdrops.findIndex(i => i.filePath === path)
    } else if (this.selectedGalleryType === 'poster') {
      images = this.posters.map(i => `${environment.imageCdn}/original${i.filePath}`)
      selected = this.posters.findIndex(i => i.filePath === path)
    }
    ImageViewerComponent.open(this.dialog, images, selected);
  }

}
