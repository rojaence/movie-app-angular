import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverMediaComponent } from './discover-media.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DiscoverMediaComponent', () => {
  let component: DiscoverMediaComponent;
  let fixture: ComponentFixture<DiscoverMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverMediaComponent, HttpClientTestingModule, BrowserAnimationsModule,
        RouterModule.forRoot(
          [{path: '', component: DiscoverMediaComponent}]
        )
      ]
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
