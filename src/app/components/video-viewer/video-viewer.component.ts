import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-viewer',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule ],
  templateUrl: './video-viewer.component.html',
  styleUrl: './video-viewer.component.scss'
})
export class VideoViewerComponent {
  constructor(
    public dialogRef: MatDialogRef<VideoViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { videoUri: SafeUrl, title: string}
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  static open(dialog: MatDialog, videoUri: SafeUrl, title: string): MatDialogRef<VideoViewerComponent> {
    return dialog.open(VideoViewerComponent, {
      data: { videoUri, title },
      panelClass: 'dialog-container',
      backdropClass: 'custom-dialog-backdrop',
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%'
    });
  }
}
