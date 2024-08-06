import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { combineLatest, finalize, Subscription } from 'rxjs';
import { IMediaCard, IMovieCast, IMovieCrew, IPersonCredit, ITvCast, ITvCrew, MediaTypeToggleItem } from '../../../models/interfaces';
import { MediaCarouselModule } from '../../../modules/media-carousel/media-carousel.module';
import { MediaTypeEnum } from '../../../models/enums';
import { AppRepeatDirective } from '../../../directives/app-repeat.directive';
import { MediaCardComponent } from "../../../components/media-card/media-card.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardSkeletonComponent } from "../../../components/card-skeleton/card-skeleton.component";
import { environment } from '../../../../environments/environment';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credits-gallery',
  standalone: true,
  imports: [MediaCarouselModule, AppRepeatDirective, MediaCardComponent, RouterModule, CardSkeletonComponent, MatButtonToggleModule, FormsModule],
  templateUrl: './credits-gallery.component.html',
  styleUrl: './credits-gallery.component.scss'
})

export class CreditsGalleryComponent implements OnInit, OnChanges, OnDestroy {
  personId?: number;
  subscription = new Subscription();
  loading = true;
  selectedMediaType: 'movie' | 'tv' = 'movie';
  selectedCreditType: 'cast' | 'crew' = 'cast';

  movieCredits?: IPersonCredit<IMovieCast, IMovieCrew>;
  tvCredits?: IPersonCredit<ITvCast, ITvCrew>;

  mediaItems: IMediaCard[] = [];

  mediaTypes: MediaTypeToggleItem<'movie'| 'tv'>[] = [
    {
      value: 'movie',
      viewValue: 'Movies'
    },
    {
      value: 'tv',
      viewValue: 'Tv series'
    }
  ]

  creditTypes: MediaTypeToggleItem<'cast' | 'crew'>[] = [
    {
      value: 'cast',
      viewValue: 'Cast'
    },
    {
      value: 'crew',
      viewValue: 'Crew'
    }
  ]

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.personId = parseInt(params['id']);
      this.fetchData();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['personId']) {
      this.fetchData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchData() {
    if (!this.personId) return;
    this.loading = true;
    this.mediaItems = [];
    this.subscription.unsubscribe();
    let movieSub = this.personService.getMovieCredits(this.personId);
    let tvSub = this.personService.getTvCredits(this.personId);

    let combined = combineLatest([movieSub, tvSub]);
    this.subscription = combined
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: ([movies, tvseries]) => {
        this.movieCredits = movies;
        this.tvCredits = tvseries;
        this.setMediaItems();
      },
      error(err) {
        console.log(err);
      }
    });
  }

  setMediaItems() {
    if (!this.movieCredits && !this.tvCredits) this.mediaItems = [];
    if (this.selectedMediaType === 'movie' && this.movieCredits) {
      this.mediaItems = this.movieCredits[this.selectedCreditType].map(m => {
        return {
          title: m.title,
          id: m.id,
          mediaType: MediaTypeEnum.movie,
          imageUri: m.posterPath ? `${environment.imageCdn}/w300/${m.posterPath}` : "",
          contentUri: '#'
        }
      });
    } else if (this.selectedMediaType === 'tv' && this.tvCredits) {
      this.mediaItems = this.tvCredits[this.selectedCreditType].map(m => {
        return {
          title: m.name,
          id: m.id,
          mediaType: MediaTypeEnum.tv,
          imageUri: m.posterPath ? `${environment.imageCdn}/w300/${m.posterPath}` : "",
          contentUri: '#'
        }
      });
    }
  }
}

