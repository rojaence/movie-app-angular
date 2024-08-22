import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { finalize, Subscription } from 'rxjs';
import { TvService } from '../../services/tv.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { CardSkeletonComponent } from "../../components/card-skeleton/card-skeleton.component";
import { CommonModule } from '@angular/common';
import { MediaVirtualGridModule } from '../../modules/media-virtual-grid/media-virtual-grid.module';
import { MediaCardComponent } from "../../components/media-card/media-card.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMediaCard, MediaTypeToggleItem } from '../../models/interfaces';
import { MatChipsModule } from '@angular/material/chips';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { MediaTypeEnum } from '../../models/enums';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-media-search',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTabsModule, CardSkeletonComponent, RouterModule, CommonModule, MediaVirtualGridModule, MediaCardComponent, FormsModule, ReactiveFormsModule, MatChipsModule, NgxPaginationModule, PaginatorComponent, SearchBarComponent, MatIconModule],
  templateUrl: './media-search.component.html',
  styleUrl: './media-search.component.scss'
})

export class MediaSearchComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  loading = true;
  currentPage = 1;
  totalItems = 0;
  totalPages = 0;
  mediaItems: IMediaCard[] = []
  @ViewChild(SearchBarComponent) searchBarComponent!: SearchBarComponent;

  movieSubscription: Subscription = new Subscription();
  tvSubscription: Subscription = new Subscription();
  searchSubscription: Subscription = new Subscription();
  paramsSubscription: Subscription = new Subscription()

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

  mediaType: MediaTypeEnum = MediaTypeEnum.movie

  constructor (
    private movieService: MovieService,
    private tvService: TvService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe(value => {
      let query = value['query'] !== undefined ? decodeURIComponent(value['query']) : '';
      let mediaTypeParam = value['mediaType'] !== undefined ? decodeURIComponent(value['mediaType']): 'movie';
      let pageParam = value['page'] !== undefined ? parseInt(value['page']) : 1;
      this.searchQuery = query;
      this.mediaType = mediaTypeParam as MediaTypeEnum;
      this.currentPage = pageParam;
      this.search();
    });
  }

  onSelectedChip(value: 'movie' | 'tv' | 'person') {
    if (value !== this.mediaType) {
      this.mediaType = value as MediaTypeEnum
      this.router.navigate(['/search'],
        {
          queryParams: {
            query: encodeURIComponent(this.searchQuery),
            page: 1,
            mediaType: this.mediaType
          }
        }
      );
    }
  }

  onRequestPage(event: number) {
    this.router.navigate(['/search'],
      {
        queryParams: {
          query: encodeURIComponent(this.searchQuery),
          page: event,
          mediaType: this.mediaType
        }
      }
    );
  }

  search() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.loading = true;

    if (this.mediaType === 'movie') {
      this.searchSubscription = this.movieService.search(this.searchQuery, this.currentPage)
      .pipe(
        finalize(() => {
          this.loading = false
        })
      ).subscribe(movieResponse => {
        this.mediaItems = movieResponse.results.map(m => m.getMediaCardData());
        this.totalItems = movieResponse.totalResults
        this.totalPages = movieResponse.totalPages
      })
    } else if (this.mediaType === 'tv') {
      this.searchSubscription = this.tvService.search(this.searchQuery, this.currentPage)
      .pipe(
        finalize(() => {
          this.loading = false
        })
      ).subscribe(tvResponse => {
        this.mediaItems = tvResponse.results.map(m => m.getMediaCardData());
        this.totalItems = tvResponse.totalResults
        this.totalPages = tvResponse.totalPages
      })
    } else if (this.mediaType === 'person') {
      this.searchSubscription = this.personService.search(this.searchQuery, this.currentPage)
      .pipe(
        finalize(() => {
          this.loading = false
        })
      ).subscribe(personResponse => {
        this.mediaItems = personResponse.results.map(m => m.getMediaCardData());
        this.totalItems = personResponse.totalResults
        this.totalPages = personResponse.totalPages
      })
    }
  }

  ngOnDestroy(): void {
    this.movieSubscription.unsubscribe()
    this.tvSubscription.unsubscribe()
    this.searchSubscription.unsubscribe()
    this.paramsSubscription.unsubscribe()
  }
}
