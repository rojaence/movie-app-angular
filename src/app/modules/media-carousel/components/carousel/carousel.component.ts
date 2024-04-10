import { Component, ElementRef, ViewChild, OnDestroy, ContentChildren, QueryList, AfterViewInit, Input } from '@angular/core';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})

export class CarouselComponent implements OnDestroy, AfterViewInit {
  scrollX = 0;
  scrollEnd = false;
  @Input() disabled = false;
  @ViewChild('slideList') slideList: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('leftButton') leftButton: ElementRef | undefined;
  @ViewChild('rightButton') rightButton: ElementRef | undefined;
  @ContentChildren(CarouselItemComponent) items = new QueryList<CarouselItemComponent>();
  itemsChangeSubscription: Subscription | undefined;
  itemsToShow: CarouselItemComponent[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.slideList?.nativeElement.addEventListener('scroll', this.onScrollEvent);
    this.itemsChangeSubscription = this.items.changes.subscribe((c) => {
      this.scrollX = 0;
      this.slideList!.nativeElement.scrollLeft = 0;
      this.scrollEnd = false;
    })
  }

  ngOnDestroy(): void {
    this.slideList?.nativeElement.removeEventListener('scroll', this.onScrollEvent);
    this.itemsChangeSubscription?.unsubscribe();
  }

  onScrollEvent = () => {
    this.scrollX = this.slideList!.nativeElement.scrollLeft;
    this.endScrollCheck();
  };

  endScrollCheck() {
    const listElement = this.slideList!.nativeElement;
    if (Math.floor(listElement!.scrollWidth - listElement!.scrollLeft) <= listElement!.offsetWidth) {
      this.scrollEnd = true;
    } else {
      this.scrollEnd = false;
    }
  }

  scrollShift(direction: 'right' | 'left') {
    const listElement = this.slideList!.nativeElement;
    const listRects = listElement.getBoundingClientRect();

    let value = 0;
    if (direction === 'right') {
      if (this.scrollEnd) return;
      value = listRects.width;
    }
    if (direction === 'left') {
      if (this.scrollX === 0) return;
      value -= listRects.width;
    }
    this.scrollList(value);
  }

  scrollList(value: number) {
    this.slideList!.nativeElement.scrollLeft += value;
    this.scrollX += value;
    this.endScrollCheck();
  }
}
