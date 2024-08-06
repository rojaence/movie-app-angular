import { Component, HostListener, ViewChild, ElementRef, OnInit, Renderer2, Input, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { slideDownAnimation } from './search-bar.animations';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MediaTypeEnum } from '../../models/enums';
import { debounceTime, distinctUntilChanged, filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatToolbar],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  animations: [slideDownAnimation]
})
export class SearchBarComponent implements OnInit, OnDestroy {
  isOpen = false;
  search = new FormControl();
  animationComplete = false;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('searchBar') searchBar!: ElementRef;
  private searchSubscription: Subscription = new Subscription();
  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isOpen && event.key === 'Escape') {
      this.toggle();
    }
  }
  routeSub = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.searchSubscription = this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      if (searchTerm && searchTerm.trim()) {
        this.goToSearch()
      }
    })
    this.routeSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.data['name'])
    ).subscribe(name => {
      if (name !== 'search') this.close();
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.routeSub.unsubscribe();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchInput.nativeElement.focus();
    }
  }

  close() {
    this.isOpen = false;
    this.search.setValue('');
  }

  onAnimationStart() {
    this.animationComplete = false;
  }

  onAnimationDone() {
    this.animationComplete = true;
  }

  goToSearch() {
    let params = this.activatedRoute.snapshot.queryParams;
    let mediaTypeParam = MediaTypeEnum.movie;
    if (params['mediaType']) {
      mediaTypeParam = params['mediaType']
    }
    this.router.navigate(['/search'],
      {
        queryParams: {
          query: encodeURIComponent(this.search.value),
          page: 1,
          mediaType: mediaTypeParam
        }
      }
    );
  }
}
