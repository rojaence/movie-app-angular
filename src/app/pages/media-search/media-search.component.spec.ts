import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSearchComponent } from './media-search.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MediaSearchComponent', () => {
  let component: MediaSearchComponent;
  let fixture: ComponentFixture<MediaSearchComponent>;

  const mockActivatedRoute = {
    queryParams: of({query: 'test'})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaSearchComponent,  RouterTestingModule,
        HttpClientTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MediaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get query param from URL', () => {
    expect(component.searchQuery).toBe('test');
  });
});
