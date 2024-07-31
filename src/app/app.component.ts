import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, EventType, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
  searchRoute = false
  @ViewChild('searchBar') searchBarComponent!: SearchBarComponent;
  @ViewChild('searchBarButton') searchBarButton!: ElementRef;
  routerSubscripion = new Subscription()

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routerSubscripion = this.router.events.pipe(
      filter(event => event.type === EventType.NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe((data) => {
      this.searchRoute = data['name'] === 'search'
    })
  }
}
