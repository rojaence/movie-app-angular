import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDetailsComponent } from './media-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MediaDetailsComponent', () => {
  let component: MediaDetailsComponent;
  let fixture: ComponentFixture<MediaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaDetailsComponent, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
