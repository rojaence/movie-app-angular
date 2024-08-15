import { Component, OnInit } from '@angular/core';
import { TimeWindowEnum } from '../../models/enums';
import { IMediaCard, MediaTypeToggleItem } from '../../models/interfaces';
import { finalize, Subscription } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { TvService } from '../../services/tv.service';
import { Movie } from '../../models/movie.model';
import { Tv } from '../../models/tv.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MediaVirtualGridModule } from '../../modules/media-virtual-grid/media-virtual-grid.module';
import { MediaCardComponent } from '../../components/media-card/media-card.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';
import { ScrollTopComponent } from '../../components/scroll-top/scroll-top.component';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [MatButtonToggleModule, MatProgressSpinner, MediaVirtualGridModule, MediaCardComponent, RouterModule, FormsModule, ScrollTopComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss'
})
export class TrendingComponent implements OnInit {
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

  selectedMediaType: 'movie' | 'tv' = 'movie';
  selectedTimeWindow: TimeWindowEnum = TimeWindowEnum.day;

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
      this.subscription = this.movieService.getTrending(this.selectedTimeWindow, this.currentPage)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (value) => {
          this.totalPages = value.totalPages;
          this.currentPage = value.page;
          this.setMediaItems(value.results);
        },
      })
    } else if (this.selectedMediaType === 'tv') {
      this.subscription = this.tvService.getTrending(this.selectedTimeWindow, this.currentPage)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (value) => {
          this.totalPages = value.totalPages;
          this.currentPage = value.page;
          this.setMediaItems(value.results);
        },
      })
    } else if (this.selectedMediaType === 'person') {
      this.subscription = this.personService.getTrending(this.selectedTimeWindow, this.currentPage)
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
