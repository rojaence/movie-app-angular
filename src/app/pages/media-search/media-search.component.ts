import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { combineLatest, finalize, Subscription } from 'rxjs';
import { TvService } from '../../services/tv.service';
import { Tv } from '../../models/tv.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { CardSkeletonComponent } from "../../components/card-skeleton/card-skeleton.component";
import { CommonModule } from '@angular/common';
import { MediaVirtualGridModule } from '../../modules/media-virtual-grid/media-virtual-grid.module';
import { MediaCardComponent } from "../../components/media-card/media-card.component";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MediaTypeToggleItem } from '../../models/interfaces';

@Component({
  selector: 'app-media-search',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTabsModule, CardSkeletonComponent, RouterModule, CommonModule, MediaVirtualGridModule, MediaCardComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './media-search.component.html',
  styleUrl: './media-search.component.scss'
})

export class MediaSearchComponent implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];
  totalMovies = 0;
  totalSeries = 0;
  tvseries: Tv[] = [];
  loading = true;
  selectedMediaTypeIndex = 0;

  movieSubscription: Subscription = new Subscription();
  tvSubscription: Subscription = new Subscription();

  searchSubscription: Subscription = new Subscription();

  tabs = ['Movies', 'Tv Series'];
  selectedTab = new FormControl(0);

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


  constructor (
    private movieService: MovieService,
    private tvService: TvService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      let query = value['query'] !== undefined ? decodeURIComponent(value['query']) : '';
      this.searchQuery = query;
      this.search();
    });
  }

  get movieTabLabel(): string {
    return `Movies (${this.totalMovies})`
  }

  get tvTabLabel(): string {
    return `Tv series (${this.totalSeries})`
  }

  search() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.loading = true;

    const movieSubscription$ = this.movieService.search(this.searchQuery);

    const tvSubscription$ = this.tvService.search(this.searchQuery);

    this.searchSubscription = combineLatest([movieSubscription$, tvSubscription$])
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe(([movieResponse, tvResponse]) => {
      this.movies = movieResponse.results;
      this.tvseries = tvResponse.results;
      this.totalMovies = movieResponse.totalResults;
      this.totalSeries = tvResponse.totalResults;
    });
  }
}
