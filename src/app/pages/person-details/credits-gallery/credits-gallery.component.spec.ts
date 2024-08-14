import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsGalleryComponent } from './credits-gallery.component';

describe('CreditsGalleryComponent', () => {
  let component: CreditsGalleryComponent;
  let fixture: ComponentFixture<CreditsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditsGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});