import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMediaInfo, IVideoResource } from '../../../models/interfaces';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MediaTypeChipComponent } from '../../../components/media-type-chip/media-type-chip.component';
import { VideoViewerComponent } from '../../../components/video-viewer/video-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from '../../../services/movie.service';
import { TvService } from '../../../services/tv.service';
import { finalize } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MediaTypeEnum } from '../../../models/enums';

@Component({
  selector: 'app-media-info',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatButtonModule, MatRippleModule, MediaTypeChipComponent, VideoViewerComponent ],
  templateUrl: './media-info.component.html',
  styleUrl: './media-info.component.scss'
})
export class MediaInfoComponent implements OnInit, OnChanges {
  @Input() data!: IMediaInfo;
  introVideo: IVideoResource | undefined;
  loadingVideo = true;

  constructor(
    private movieService: MovieService,
    private tvService: TvService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  openVideoViewer(): void {
    if (this.introVideo) {
      VideoViewerComponent.open(this.dialog,
        this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.introVideo.key}`),
        this.introVideo.name
      );
    }
  }

  ngOnInit(): void {
    this.fetchVideo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fetchVideo();
    }
  }

  fetchVideo() {
    if (this.data.mediaType === "movie") {
      this.movieService.getVideoGallery(this.data.id)
      .pipe(
        finalize(() => this.loadingVideo = false)
      )
      .subscribe({
        next: (val) => {
          this.setIntroVideo(val.results);
        }
      })
    }
    else if (this.data.mediaType === "tv") {
      this.tvService.getVideoGallery(this.data.id)
      .pipe(
        finalize(() => this.loadingVideo = false)
      )
      .subscribe({
        next: (val) => {
          this.setIntroVideo(val.results);
        }
      })
    }
  }

  setIntroVideo(videos: IVideoResource[]) {
    let intro = videos.find(v => v.type === "Trailer");
    if (intro) {
      this.introVideo = intro;
    } else {
      this.introVideo = undefined;
    }
  }

  goToMovies(genreId: number) {
    let route = "/movies";
    if (this.data.mediaType === MediaTypeEnum.tv) route = "/tv";
    this.router.navigate([route],
      {
        queryParams: {
          genre: encodeURIComponent(genreId),
        }
      }
    );
  }

}
