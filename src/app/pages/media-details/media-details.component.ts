import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaInfoComponent } from './media-info/media-info.component';
import { IMediaInfo } from '../../models/interfaces';
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';
import { environment } from '../../../environments/environment';
import { MediaTypeEnum } from '../../models/enums';
import { MediaCarouselModule } from '../../modules/media-carousel/media-carousel.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss',
  imports: [ MediaInfoComponent, MediaCarouselModule, CommonModule ],
  standalone: true
})

export class MediaDetailsComponent implements OnInit {
  id: number | undefined;
  mediaType: string = "";
  mediaInfo!: IMediaInfo;
  backgroundImage: string = "";

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private tvService: TvService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.mediaType = this.route.snapshot.url[0].path;
      this.fetchData();
    })
  }

  fetchData() {
    if (!this.id) return;

    if (this.mediaType === 'movie') {
      this.movieService.getDetails(this.id).subscribe(
        {
          next: (value) => {
            this.mediaInfo = {
              title: value.title,
              overview: value.overview,
              posterPath: `${environment.imageCdn}/w300${value.posterPath}`,
              voteAverage: value.voteAverage,
              genres: value.genres,
              mediaType: MediaTypeEnum.movie,
              release: value.releaseDate,
              tagline: value.tagline,
            }
            this.backgroundImage = `${environment.imageCdn}/w1280${value.backdropPath}`;
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    }
    if (this.mediaType === 'tv') {
      this.tvService.getDetails(this.id).subscribe(
        {
          next: (value) => {
            this.mediaInfo = {
              title: value.name,
              overview: value.overview,
              posterPath: `${environment.imageCdn}/w300${value.posterPath}`,
              voteAverage: value.voteAverage,
              genres: value.genres,
              mediaType: MediaTypeEnum.tv,
              release: value.firstAirDate,
              tagline: value.tagline,
            }
            this.backgroundImage = `${environment.imageCdn}/w1280${value.backdropPath}`;
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    }
  }
}
