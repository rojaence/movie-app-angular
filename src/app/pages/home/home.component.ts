import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Tv } from '../../models/tv.model';
import { TvService } from '../../services/tv.service';
import { MovieService } from '../../services/movie.service';
import { map, combineLatest, Subscription } from 'rxjs';
import { MediaCarouselModule } from '../../modules/media-carousel/media-carousel.module';
import { MediaCardComponent } from '../../components/media-card/media-card.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MediaTypeToggleItem } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [ MediaCarouselModule, MediaCardComponent, MatButtonToggleModule]
})
export class HomeComponent implements OnInit, OnDestroy {
  trendingSubscription: Subscription;
  popularSubscription: Subscription;
  trending: (Movie | Tv)[] = [];
  popular: (Movie | Tv)[] = [];

  mediaTypes: MediaTypeToggleItem[] = [
    {
      value: 'movie',
      viewValue: 'Movies'
    },
    {
      value: 'tv',
      viewValue: 'Tv Shows'
    }
  ];

  selectedMediaType: 'movie' | 'tv' = 'tv';

  constructor(private movieService: MovieService, private tvService: TvService) {
    this.popularSubscription = new Subscription();
    this.trendingSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.getTrendingMedia();
    this.getPopularMedia(this.selectedMediaType);
  }

  getTrendingMedia() {
    if (this.trendingSubscription) {
      this.trendingSubscription.unsubscribe();
    }

    const movieTrending$ = this.movieService.getTrending().pipe(
      map(response => response.results.map(movieData => Movie.fromApiResponse(movieData))
    ));

    const tvTrending$ = this.tvService.getTrending().pipe(
      map(response => response.results.map(movieData => Tv.fromApiResponse(movieData))
    ));

    this.trendingSubscription = combineLatest([movieTrending$, tvTrending$]).subscribe(([movies, tvShows]) => {
      let trendingItems = [...movies, ...tvShows].sort((a, b) => b.popularity - a.popularity)
      this.trending = trendingItems;
    });
  }

  getPopularMedia(mediaType: 'movie' | 'tv') {
    if (this.trendingSubscription) {
      this.popularSubscription.unsubscribe();
    }

    if (mediaType === 'movie') {
      this.popularSubscription = this.movieService.getPopular().subscribe(response => {
        let movies = response.results.map(m => Movie.fromApiResponse(m));
        this.popular = movies;
      });
    } else if (mediaType === 'tv') {
      this.popularSubscription = this.tvService.getPopular().subscribe(response => {
        let tvShows = response.results.map(m => Tv.fromApiResponse(m));
        this.popular = tvShows;
      });
    }
  }


  ngOnDestroy(): void {
      this.trendingSubscription.unsubscribe();
  }
}
