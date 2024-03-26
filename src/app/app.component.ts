import { Component, OnInit } from '@angular/core';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  trending: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // this.movieService.getAll().subscribe();
    this.movieService.getTrending().subscribe(response => {
      this.trending = response.results;
    })
  }
}
