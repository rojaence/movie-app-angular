import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription, finalize } from 'rxjs';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';
import { MediaInfoSkeletonComponent } from './media-info-skeleton/media-info-skeleton.component';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss',
  imports: [ MediaInfoComponent, MediaCarouselModule, CommonModule, RouterModule, AppRepeatDirective, MediaCardComponent, CardSkeletonComponent, MediaGalleryComponent, MediaInfoSkeletonComponent ],
  standalone: true
})

export class MediaDetailsComponent implements OnInit, OnDestroy {
  id: number = 0;
  mediaType: 'movie' | 'tv' = "movie";
  mediaInfo!: IMediaInfo;
  backgroundImage: string = "";
  recommendations: Movie[] | Tv[] = [];
  loadingInfo = true;
  loadingRecommendations = true;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private tvService: TvService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.mediaType = this.route.snapshot.url[0].path as 'movie' | 'tv';
      this.fetchData();
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  fetchData() {
    if (!this.id) return;
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    this.loadingInfo = true;
    this.loadingRecommendations = true;
    this.backgroundImage = "";
    if (this.mediaType === 'movie') {
      const detailSub = this.movieService.getDetails(this.id)
      .pipe(
        finalize(() => this.loadingInfo = false)
      )
      .subscribe(
        {
          next: (value) => {
            this.mediaInfo = {
              id: value.id,
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
      const recomSub = this.movieService.getRecommendations(this.id)
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

      this.subscriptions.push(detailSub, recomSub);
    }
    if (this.mediaType === 'tv') {
      const detailSub = this.tvService.getDetails(this.id)
      .pipe(
        finalize(() => this.loadingInfo = false)
      )
      .subscribe(
        {
          next: (value) => {
            this.mediaInfo = {
              id: value.id,
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

      const recomSub = this.tvService.getRecommendations(this.id).subscribe({
        next: (value) => {
          this.recommendations = value.results.map(m => Tv.fromApiResponse(m));
          this.loadingRecommendations = false;
        },
        error: (err) => {
          console.log(err)
          this.loadingRecommendations = false;
        },
      })

      this.subscriptions.push(detailSub, recomSub);
    }
  }
}
