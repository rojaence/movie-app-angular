import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Tv } from '../../models/tv.model';
import { TvService } from '../../services/tv.service';
import { MovieService } from '../../services/movie.service';
import { Subscription, finalize } from 'rxjs';
import { MediaCarouselModule } from '../../modules/media-carousel/media-carousel.module';
import { MediaCardComponent } from '../../components/media-card/media-card.component';
import { MediaTypeToggleItem } from '../../models/interfaces';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { CardSkeletonComponent } from '../../components/card-skeleton/card-skeleton.component';
import { AppRepeatDirective } from '../../directives/app-repeat.directive';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeWindowEnum } from '../../models/enums';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [ MediaCarouselModule, MediaCardComponent, MatButtonToggleModule, MatProgressBarModule, MatProgressSpinnerModule, SkeletonComponent, CardSkeletonComponent, AppRepeatDirective, NgIf, FormsModule, RouterModule],
})
export class HomeComponent implements OnInit, OnDestroy {
  trendingSubscription: Subscription;
  popularSubscription: Subscription;
  trending: (Movie | Tv)[] = [];
  popular: (Movie | Tv)[] = [];
  loadingTrending = true;
  loadingPopular = true;

  mediaTypes: MediaTypeToggleItem<'movie' | 'tv'>[] = [
    {
      value: 'movie',
      viewValue: 'Movies'
    },
    {
      value: 'tv',
      viewValue: 'Tv Shows'
    }
  ];

  timeWindows: MediaTypeToggleItem<TimeWindowEnum>[] = [
    {
      value: TimeWindowEnum.day,
      viewValue: 'Today',
    },
    {
      value: TimeWindowEnum.week,
      viewValue: 'Week',
    }
  ]

  popularMediaType: 'movie' | 'tv' = 'movie';
  trendingMediaType: 'movie' | 'tv' = 'movie';
  selectedTimeWindow: TimeWindowEnum = TimeWindowEnum.day;

  constructor(private movieService: MovieService, private tvService: TvService) {
    this.popularSubscription = new Subscription();
    this.trendingSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.getTrendingMedia(this.trendingMediaType, this.selectedTimeWindow);
    this.getPopularMedia(this.popularMediaType);
  }

  getTrendingMedia(mediaType: 'movie' | 'tv', timeWindow: TimeWindowEnum) {
    if (this.trendingSubscription) {
      this.trendingSubscription.unsubscribe();
      this.loadingTrending = true;
    }

    if (mediaType === 'movie') {
      this.trendingSubscription = this.movieService.getTrending(timeWindow)
      .pipe(
        finalize(() => this.loadingTrending = false)
      )
      .subscribe(response => {
        this.trending = response.results;
      });
    } else if (mediaType === 'tv') {
      this.trendingSubscription = this.tvService.getTrending(timeWindow)
      .pipe(
        finalize(() => this.loadingTrending = false)
      )
      .subscribe(response => {
        this.trending = response.results;
      });
    }
  }

  getPopularMedia(mediaType: 'movie' | 'tv') {
    if (this.popularSubscription) {
      this.popularSubscription.unsubscribe();
      this.loadingPopular = true;
    }

    if (mediaType === 'movie') {
      this.popularSubscription = this.movieService.getPopular()
      .pipe(
        finalize(() => this.loadingPopular = false)
      )
      .subscribe(response => {
        let movies = response.results;
        this.popular = movies;
      });
    } else if (mediaType === 'tv') {
      this.popularSubscription = this.tvService.getPopular()
      .pipe(
        finalize(() => this.loadingPopular = false)
      )
      .subscribe(response => {
        let tvShows = response.results;
        this.popular = tvShows;
      });
    }
  }

  ngOnDestroy(): void {
      this.trendingSubscription.unsubscribe();
      this.popularSubscription.unsubscribe();
  }
}
