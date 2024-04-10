import { Component, ElementRef, ViewChild, OnDestroy, ContentChildren, QueryList, OnChanges, SimpleChanges, OnInit, AfterViewInit } from '@angular/core';
import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { Subscription } from 'rxjs';
import { fadeAnimation } from '../../../../components/animations/fade-animation';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [fadeAnimation]
})

export class CarouselComponent implements OnDestroy, AfterViewInit {
  scrollX = 0;
  scrollEnd = false;
  @ViewChild('slideList') slideList: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('leftButton') leftButton: ElementRef | undefined;
  @ViewChild('rightButton') rightButton: ElementRef | undefined;
  @ContentChildren(CarouselItemComponent) items = new QueryList<CarouselItemComponent>();
  itemsChangeSubscription: Subscription | undefined;

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
    const listChildren = Array.from(listElement.children) as HTMLElement[];
    let reference = this.getReferenceChild(direction, listChildren);
    let value = 0;
    if (direction === 'right') {
      if (this.scrollEnd) return;
      value = reference ? reference.getBoundingClientRect().x - listRects.x : 0;
    }
    if (direction === 'left') {
      if (this.scrollX === 0) return;
      value -= reference ? listRects.width - reference.getBoundingClientRect().right : 0
    }
    this.scrollCommit(value);
  }

  getReferenceChild(direction: 'right' | 'left', children: HTMLElement[]): HTMLElement | undefined {
    let reference: HTMLElement | undefined;
    const listRects = this.slideList!.nativeElement.getBoundingClientRect();

    for (let i = 0; i < children.length; i++) {
      let rect = children[i].getBoundingClientRect();
      if (direction === 'right') {
        if (rect.right > listRects.right && rect.left < listRects.right) {
          reference = children[i];
          break;
        }
      }
      if (direction === 'left') {
        if (rect.left >= listRects.left) {
          reference = children[i - 1];
          break;
        }
      }
    }
    return reference;
  }

  scrollCommit(value: number) {
    this.slideList!.nativeElement.scrollLeft += value;
    this.scrollX += value;
    this.endScrollCheck();
  }
}
