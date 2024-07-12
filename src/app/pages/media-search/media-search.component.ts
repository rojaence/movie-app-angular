import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { combineLatest, Subscription } from 'rxjs';
import { TvService } from '../../services/tv.service';
import { Tv } from '../../models/tv.model';

@Component({
  selector: 'app-media-search',
  standalone: true,
  imports: [],
  templateUrl: './media-search.component.html',
  styleUrl: './media-search.component.scss'
})
export class MediaSearchComponent implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];
  tvseries: Tv[] = [];
  loading = true;

  movieSubscription: Subscription = new Subscription();
  tvSubscription: Subscription = new Subscription();

  searchSubscription: Subscription = new Subscription();

  constructor (
    private movieService: MovieService,
    private tvService: TvService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      let query = decodeURIComponent(value['query']);
      this.searchQuery = query;
      this.search();
    });
  }

  search() {
    this.movieSubscription = this.movieService.search(this.searchQuery)
      .subscribe(response => {
        this.movies = response.results;
      }
    );

    this.tvSubscription = this.tvService.search(this.searchQuery)
      .subscribe(response => {
        this.tvseries = response.results;
      }
    );


    /* combineLatest(
      this.movieSubscription,
      // combineLatest also takes an optional projection function
      (one, two, three) => {
        return `Timer One (Proj) Latest: ${one},
                  Timer Two (Proj) Latest: ${two},
                  Timer Three (Proj) Latest: ${three}`;
      }
    ).subscribe(console.log); */
  }
}
