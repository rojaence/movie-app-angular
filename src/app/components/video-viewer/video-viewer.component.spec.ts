import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewerComponent } from './video-viewer.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MOCK_VIDEO_GALLERY_DATA } from '../../mocks/gallery-mock-data';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

describe('VideoViewerComponent', () => {
  let component: VideoViewerComponent;
  let fixture: ComponentFixture<VideoViewerComponent>;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<VideoViewerComponent>;
  let sanitizer: DomSanitizer;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoViewerComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();

    sanitizer = TestBed.inject(DomSanitizer);
    fixture = TestBed.createComponent(VideoViewerComponent);
    component = fixture.componentInstance;
    component.data = {
      videoUri: sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${MOCK_VIDEO_GALLERY_DATA.results[0].key}`),
      title: MOCK_VIDEO_GALLERY_DATA.results[0].name
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
