import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.scss'
})
export class ScrollTopComponent implements OnInit {
  @Input() color: string = 'primary';
  show: boolean = false;
  private drawerContentElement!: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.drawerContentElement = document.querySelector('mat-drawer-content') as HTMLElement;
    if (this.drawerContentElement) {
      this.drawerContentElement.addEventListener('scroll', this.onScroll.bind(this));
      // Escucha el evento de scroll en el contenedor
    }
  }

  onScroll(): void {
    if (this.drawerContentElement) {
      this.show = this.drawerContentElement.scrollTop > 300;
    }
  }

  handleScrollTop(): void {
    if (this.drawerContentElement) {
      this.drawerContentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
