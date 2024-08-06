import { Component, ElementRef, ViewChild, OnDestroy, ContentChildren, QueryList, AfterViewInit, Input, Renderer2 } from '@angular/core';
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
  @ContentChildren(CarouselItemComponent) items = new QueryList<CarouselItemComponent>();
  itemsChangeSubscription: Subscription | undefined;

  constructor(
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.slideList?.nativeElement.addEventListener('scroll', this.onScrollEvent);
    this.itemsChangeSubscription = this.items.changes.subscribe(() => {
      this.resetScroll();
    });
  }

  ngOnDestroy(): void {
    this.slideList?.nativeElement.removeEventListener('scroll', this.onScrollEvent);
    this.itemsChangeSubscription?.unsubscribe();
  }

  onScrollEvent = () => {
    if (this.slideList) {
      this.scrollX = this.slideList.nativeElement.scrollLeft;
      this.endScrollCheck();
    }
  };

  endScrollCheck() {
    if (this.slideList) {
      const listElement = this.slideList.nativeElement;
      this.scrollEnd = Math.floor(listElement.scrollWidth - listElement.scrollLeft) <= listElement.offsetWidth;
    }
  }

  scrollList(value: number) {
    if (!this.slideList) return;
    this.slideList.nativeElement.scrollLeft += value;
    this.scrollX += value;
    this.endScrollCheck();
  }


  resetScroll() {
    if (this.slideList) {
      this.scrollX = 0;
      this.slideList.nativeElement.scrollLeft = 0;
      this.scrollEnd = false;
    }
  }

  scrollShift(direction: 'right' | 'left') {
    if (!this.slideList) return;
    const listElement = this.slideList.nativeElement;
    const listRects = listElement.getBoundingClientRect();
    const children = Array.from(listElement.children) as HTMLElement[];

    if (direction === 'right') {
      let lastVisibleChild: HTMLElement | null = null;

      for (const child of children) {
        const childRect = child.getBoundingClientRect();
        if (childRect.left >= listRects.left && childRect.right <= listRects.right) {
          lastVisibleChild = child;
        } else if (lastVisibleChild) {
          break;
        }
      }

      if (lastVisibleChild) {
        const scrollAmount = lastVisibleChild.getBoundingClientRect().left - listRects.left;
        listElement.scrollLeft += scrollAmount;
        this.scrollX += scrollAmount;
        this.endScrollCheck();
      }
    } else if (direction === 'left') {
      const listRects = listElement.getBoundingClientRect();
      let firstVisibleChild: HTMLElement | null = null;

      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        const childRect = child.getBoundingClientRect();
        if (childRect.left >= listRects.left && childRect.right <= listRects.right) {
          firstVisibleChild = child;
        } else if (firstVisibleChild) {
          break;
        }
      }

      if (firstVisibleChild) {
        const scrollAmount = firstVisibleChild.getBoundingClientRect().right - listRects.right;
        listElement.scrollLeft += scrollAmount;
        this.scrollX += scrollAmount;
        this.endScrollCheck();
      }
    }
  }

  isElementInViewport(element: HTMLElement, container: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return rect.left >= containerRect.left && rect.right <= containerRect.right;
  }
}
