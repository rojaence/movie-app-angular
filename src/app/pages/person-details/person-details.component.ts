import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { PersonService } from '../../services/person.service';
import { IPersonDetails } from '../../models/interfaces';
import { MediaInfoSkeletonComponent } from '../media-details/media-info-skeleton/media-info-skeleton.component';
import { PersonInfoComponent } from './person-info/person-info.component';
import { environment } from '../../../environments/environment';
import { CreditsGalleryComponent } from './credits-gallery/credits-gallery.component';

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [MediaInfoSkeletonComponent, PersonInfoComponent, CreditsGalleryComponent],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss'
})
export class PersonDetailsComponent implements OnInit, OnDestroy {
  id: number = 0;
  personInfo!: IPersonDetails;
  loadingInfo = true;

  private paramsSubscription = new Subscription();
  private personSubscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.fetchData();
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.personSubscription.unsubscribe();
  }

  fetchData() {
    if (!this.id) return;
    this.loadingInfo = true;
    this.personSubscription = this.personService.getDetails(this.id)
    .pipe(
      finalize(() => this.loadingInfo = false)
    ).subscribe(
      {
        next: (value) => {
          this.personInfo = {
            ...value,
            profilePath: value.profilePath ? `${environment.imageCdn}/w300${value.profilePath}` : ""
          };
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }
}
