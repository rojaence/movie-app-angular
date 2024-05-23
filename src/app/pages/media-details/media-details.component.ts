import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MediaInfoComponent } from './media-info/media-info.component';
import { IMediaInfo } from '../../models/interfaces';
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';
import { environment } from '../../../environments/environment';
import { MediaTypeEnum } from '../../models/enums';
import { MediaCarouselModule } from '../../modules/media-carousel/media-carousel.module';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { Tv } from '../../models/tv.model';
import { AppRepeatDirective } from '../../directives/app-repeat.directive';
import { MediaCardComponent } from '../../components/media-card/media-card.component';
import { CardSkeletonComponent } from '../../components/card-skeleton/card-skeleton.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss',
  imports: [ MediaInfoComponent, MediaCarouselModule, CommonModule, RouterModule, AppRepeatDirective, MediaCardComponent, CardSkeletonComponent ],
  standalone: true
})

export class MediaDetailsComponent implements OnInit {
  id: number | undefined;
  mediaType: string = "";
  mediaInfo!: IMediaInfo;
  loadingInfo = true;
  backgroundImage: string = "";
  recommendations: Movie[] | Tv[] = [];
  loadingRecommendations = true;

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
      this.movieService.getDetails(this.id)
      .pipe(
        finalize(() => this.loadingInfo = false)
      )
      .subscribe(
        {
          next: (value) => {
            this.mediaInfo = {
              title: value.title,
              overview: value.overview,
              posterPath: value.posterPath ? `${environment.imageCdn}/w300${value.posterPath}` : "",
              voteAverage: value.voteAverage,
              genres: value.genres,
              mediaType: MediaTypeEnum.movie,
              release: value.releaseDate,
              tagline: value.tagline,
            }
            this.backgroundImage = value.backdropPath ? `${environment.imageCdn}/w1280${value.backdropPath}` : "";
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
      this.movieService.getRecommendations(this.id)
      .pipe(
        finalize(() => this.loadingRecommendations = false)
      )
      .subscribe({
        next: (value) => {
          this.recommendations = value.results.map(m => Movie.fromApiResponse(m));
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
    if (this.mediaType === 'tv') {
      this.tvService.getDetails(this.id)
      .pipe(
        finalize(() => this.loadingInfo = false)
      )
      .subscribe(
        {
          next: (value) => {
            this.mediaInfo = {
              title: value.name,
              overview: value.overview,
              posterPath: value.posterPath ? `${environment.imageCdn}/w300${value.posterPath}` : "",
              voteAverage: value.voteAverage,
              genres: value.genres,
              mediaType: MediaTypeEnum.tv,
              release: value.firstAirDate,
              tagline: value.tagline,
            }
            this.backgroundImage = value.backdropPath ? `${environment.imageCdn}/w1280${value.backdropPath}` : "";
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
      this.tvService.getRecommendations(this.id).subscribe({
        next: (value) => {
          this.recommendations = value.results.map(m => Tv.fromApiResponse(m));
          this.loadingRecommendations = false;
        },
        error: (err) => {
          console.log(err)
          this.loadingRecommendations = false;
        },
      })
    }
  }
}
