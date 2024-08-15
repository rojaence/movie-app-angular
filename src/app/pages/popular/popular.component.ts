import { Component } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { IMediaCard, MediaTypeToggleItem } from '../../models/interfaces';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { Person } from '../../models/person.model';
import { Tv } from '../../models/tv.model';
import { PersonService } from '../../services/person.service';
import { TvService } from '../../services/tv.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MediaCardComponent } from '../../components/media-card/media-card.component';
import { MediaVirtualGridModule } from '../../modules/media-virtual-grid/media-virtual-grid.module';
import { ScrollTopComponent } from '../../components/scroll-top/scroll-top.component';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [MatButtonToggleModule, MatProgressSpinner, MediaVirtualGridModule, MediaCardComponent, RouterModule, FormsModule, ScrollTopComponent],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss'
})
export class PopularComponent {
  subscription = new Subscription();
  loading = true;
  currentPage = 1;
  totalPages = 1;
  mediaItems: IMediaCard[] = [];
  mediaTypes: MediaTypeToggleItem<'movie' | 'tv' | 'person'>[] = [
    {
      value: 'movie',
      viewValue: 'Movies'
    },
    {
      value: 'tv',
      viewValue: 'Tv Shows'
    },
    {
      value: 'person',
      viewValue: 'People'
    }
  ];

  selectedMediaType: 'movie' | 'tv' = 'movie';

  constructor(
    private movieService: MovieService,
    private tvService: TvService,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  onScrollEnd(status: boolean) {
    if (status) {
      this.currentPage += 1;
      this.fetchData();
    }
  }

  onChangeFilter() {
    this.currentPage = 1;
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    if (this.selectedMediaType === 'movie') {
      this.subscription = this.movieService.getPopular(this.currentPage)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (value) => {
          this.totalPages = value.totalPages;
          this.currentPage = value.page;
          this.setMediaItems(value.results);
        },
      })
    } else if (this.selectedMediaType === 'tv') {
      this.subscription = this.tvService.getPopular(this.currentPage)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (value) => {
          this.totalPages = value.totalPages;
          this.currentPage = value.page;
          this.setMediaItems(value.results);
        },
      })
    } else if (this.selectedMediaType === 'person') {
      this.subscription = this.personService.getPopular(this.currentPage)
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

  setMediaItems(data: Movie[] | Tv[] | Person[]) {
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
