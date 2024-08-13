import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appObserveElement]',
  standalone: true,
  exportAs: 'intersection'
})
export class AppObserveElementDirective implements OnInit {

  @Input() root: HTMLElement | null = null
  @Input() rootMargin = '0px 0px 0px 0px'
  @Input() threshold = 0
  @Input() debounceTime = 250
  @Input() isContinuous = false

  @Output() isIntersecting = new EventEmitter<boolean>()

  private intersectionObserver: IntersectionObserver | null = null
  private subscription: Subscription = new Subscription()

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    this.createAndObserve();
  }

  ngOnDestroy () {
    this.cleanUp();
  }

  private cleanUp() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private createAndObserve() {
    const sentinel = this.getSentinelElement();
    const options: IntersectionObserverInit = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold
    };
    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === sentinel) {
          this.handleIntersection(entry.isIntersecting);
        }
      });
    }, options);

    if (sentinel) {
      this.intersectionObserver.observe(sentinel);
    }
  }

  private getSentinelElement(): HTMLElement | null {
    const sentinel = this.element.nativeElement.querySelector('.sentinel');
    return sentinel;
  }

  private handleIntersection(isIntersecting: boolean) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = new Subscription();

    const subscription = new Observable<boolean>(subscriber => {
      subscriber.next(isIntersecting);
      if (isIntersecting && !this.isContinuous) {
        subscriber.complete();
      }
    })
    .pipe(debounceTime(this.debounceTime))
    .subscribe(status => {
      this.isIntersecting.emit(status);
    });

    this.subscription.add(subscription);
  }
}
