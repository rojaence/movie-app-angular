import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverMediaComponent } from './discover-media.component';

describe('DiscoverMediaComponent', () => {
  let component: DiscoverMediaComponent;
  let fixture: ComponentFixture<DiscoverMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverMediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscoverMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
