import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  private _isIntersecting = false
  private subscription: Subscription = new Subscription()

  constructor(private element: ElementRef) { }

  intersecting = false

  ngOnInit(): void {
    this.createAndObserve()
    this.observeLastChild()
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
    }
  }

  observeLastChild() {
    const parent = this.element.nativeElement
    const lastChild = parent.lastElementChild
    console.log('last child')
    console.log(lastChild)
    if (lastChild && this.intersectionObserver) {
      this.intersectionObserver.disconnect()
      this.intersectionObserver.observe(lastChild)
    }
  }

  createAndObserve() {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: this.rootMargin,
      threshold: this.threshold
    }

    this.intersectionObserver = new IntersectionObserver(entries => {
      const { isIntersecting } = entries[0]
      this.handleIntersection(isIntersecting)
    }, options)
  }

  handleIntersection(isIntersecting: boolean) {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    this.subscription = new Observable<boolean>(subscriber => {
      subscriber.next(isIntersecting)
      if (isIntersecting && !this.isContinuous) {
        subscriber.complete()
      }
    })
    .pipe(debounceTime(this.debounceTime))
    .subscribe(status => {
      this.isIntersecting.emit(status)
      this._isIntersecting = status
    })
  }

  public updateLastChildObservation() {
    this.observeLastChild()
  }
}
