import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerComponent } from './image-viewer.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MOCK_IMAGE_GALLERY_DATA } from '../../mocks/gallery-mock-data';

describe('ImageViewerComponent', () => {
  let component: ImageViewerComponent;
  let fixture: ComponentFixture<ImageViewerComponent>;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<ImageViewerComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  }

  const mockData = MOCK_IMAGE_GALLERY_DATA.backdrops;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageViewerComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { images: mockData, selected: 0 } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
