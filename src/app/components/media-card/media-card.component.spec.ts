import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCardComponent } from './media-card.component';
import { MOCK_MOVIE_RESPONSE } from '../../mocks/movie-mock-data';

describe('MediaCardComponent', () => {
  let component: MediaCardComponent;
  let fixture: ComponentFixture<MediaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaCardComponent);
    component = fixture.componentInstance;
    const movie = MOCK_MOVIE_RESPONSE.results[0];
    component.data = movie.getMediaCardData();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
