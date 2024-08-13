import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';
import { Tv } from '../../models/tv.model';
import { Movie } from '../../models/movie.model';
import { finalize, Subscription } from 'rxjs';
import { MediaCardComponent } from '../../components/media-card/media-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IGenre, IMediaCard, MediaTypeToggleItem } from '../../models/interfaces';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MediaVirtualGridModule } from '../../modules/media-virtual-grid/media-virtual-grid.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { movieSortItems, tvSortItems } from './discover-media.constants';

@Component({
  selector: 'app-discover-media',
  standalone: true,
  imports: [RouterModule, MediaCardComponent, FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MediaVirtualGridModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './discover-media.component.html',
  styleUrl: './discover-media.component.scss'
})
export class DiscoverMediaComponent implements OnInit {

  mediaType: 'movie' | 'tv' = 'movie';
  permittedMediaTypes = ['movie', 'tv'];
  pageTitle = {
    'movie': 'Movies',
    'tv': 'Tv Series'
  };

  selectedGenre = '';

  mediaItems: IMediaCard[] = [];
  currentPage = 1;
  totalPages = 1;
  loading = true;
  genres: IGenre[] = [];

  searchSubscription = new Subscription();
  genreSubscription = new Subscription();

  sortItems: MediaTypeToggleItem<string>[] = [];

  sortBy = 'popularity.desc';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private tvService: TvService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.mediaType = data['mediaType'];
      this.sortItems = data['mediaType'] === 'tv' ? tvSortItems : movieSortItems;
      this.getGenres();
    })
  }

  getGenres() {
    if (this.mediaType === 'movie') {
      this.genreSubscription = this.movieService.getGenres().subscribe(value => {
        this.genres = value.genres;
        this.selectedGenre = value.genres[0].id.toString();
        this.fetchData();
      })
    }
    else if (this.mediaType === 'tv') {
      this.genreSubscription = this.tvService.getGenres().subscribe(value => {
        this.genres = value.genres;
        this.selectedGenre = value.genres[0].id.toString();
        this.fetchData();
      })
    }
  }

  onChangeGenre() {
    this.currentPage = 1;
    this.fetchData();
  }

  onScrollEnd(status: boolean) {
    if (status) {
      this.currentPage += 1;
      this.fetchData();
    }
  }

  onChangeSortBy() {
    this.currentPage = 1;
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    if (this.mediaType === 'movie') {
      this.searchSubscription = this.movieService.getAll(this.currentPage, [parseInt(this.selectedGenre)], this.sortBy)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (value) => {
          this.totalPages = value.totalPages;
          this.currentPage = value.page;
          this.setMediaItems(value.results);
        },
      })
    } else if (this.mediaType === 'tv') {
      this.searchSubscription = this.tvService.getAll(this.currentPage, [parseInt(this.selectedGenre)], this.sortBy)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (value) => {
          this.totalPages = value.totalPages;
          this.currentPage = value.page;
          this.setMediaItems(value.results);
        },
      })
    }
  }

  setMediaItems(data: Movie[] | Tv[]) {
    const items = data.map(m => m.getMediaCardData());
    if (this.currentPage === 1) {
      this.mediaItems = items;
    } else {
      this.mediaItems.push(...items);
    }
  }

  loadMore() {
    if (this.currentPage > this.totalPages) {
      this.currentPage += 1;
      this.fetchData();
    }
  }
}

