import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselHeaderComponent } from './components/carousel-header/carousel-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';
import { RouterModule } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    CarouselComponent,
    CarouselHeaderComponent,
    CarouselItemComponent,
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    DragDropModule,
    RouterModule,
    MatChipsModule,
    MatRippleModule
  ],
  exports: [
    CarouselComponent,
    CarouselItemComponent,
    CarouselHeaderComponent,
  ]
})
export class MediaCarouselModule { }
