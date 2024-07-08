import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaGalleryComponent } from './media-gallery.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TvService } from '../../../services/tv.service';
import { MovieService } from '../../../services/movie.service';

describe('MediaGalleryComponent', () => {
  let component: MediaGalleryComponent;
  let fixture: ComponentFixture<MediaGalleryComponent>;
  let httpMock: HttpTestingController;
  let movieService: MovieService;
  let tvService: TvService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaGalleryComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
