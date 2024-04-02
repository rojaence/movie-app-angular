import { Component, OnInit } from '@angular/core';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie.model';
import { map } from 'rxjs/operators';
import { TvService } from './services/tv.service';
import { combineLatest } from 'rxjs';
import { Tv } from './models/tv.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  trending: (Movie | Tv)[] = [];

  constructor(private movieService: MovieService, private tvService: TvService) {}

  ngOnInit(): void {
    const movieTrending$ = this.movieService.getTrending().pipe(
      map(response => response.results.map(movieData => Movie.fromApiResponse(movieData))
    ));

    const tvTrending$ = this.tvService.getTrending().pipe(
      map(response => response.results.map(movieData => Tv.fromApiResponse(movieData))
    ));

    combineLatest([movieTrending$, tvTrending$]).subscribe(([movies, tvShows]) => {
      let trendingItems = [...movies, ...tvShows].sort((a, b) => b.popularity - a.popularity)
      this.trending = trendingItems;
    });
  }
}
