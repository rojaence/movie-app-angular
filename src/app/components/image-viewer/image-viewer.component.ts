import { Component, HostListener, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule ],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss'
})
export class ImageViewerComponent {

  constructor(
    public dialogRef: MatDialogRef<ImageViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: string[], selected: number }
  ) {}
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.key){
      case 'ArrowLeft':
        this.previous();
        break;
      case 'ArrowRight':
        this.next();
        break;
      }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  static open(dialog: MatDialog, images: string[], selected: number = 0): MatDialogRef<ImageViewerComponent> {
    return dialog.open(ImageViewerComponent, {
      data: { images, selected },
      panelClass: 'dialog-container',
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%'
    });
  }

  previous() {
    this.data.selected === 0 ? this.data.selected = this.data.images.length - 1 : this.data.selected -= 1;
  }

  next() {
    this.data.selected === this.data.images.length - 1 ? this.data.selected = 0 : this.data.selected += 1;
  }
}
