import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHeaderComponent } from './carousel-header.component';

describe('CarouselHeaderComponent', () => {
  let component: CarouselHeaderComponent;
  let fixture: ComponentFixture<CarouselHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
