import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselHeaderComponent } from './components/carousel-header/carousel-header.component';



@NgModule({
  declarations: [
    CarouselComponent,
    CarouselHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MediaCarouselModule { }
