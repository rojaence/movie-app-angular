import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
  private overflowRouteNames = ['search', 'trending', 'popular', 'movies', 'tv']
  overflowRoute = false
  @ViewChild('searchBar') searchBarComponent!: SearchBarComponent;
  @ViewChild('searchBarButton') searchBarButton!: ElementRef;
  routerSubscripion = new Subscription()

  pages = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'Movies',
      link: '/movies'
    },
    {
      name: 'Tv series',
      link: '/tv'
    },
    {
      name: 'Trending',
      link: '/trending'
    },
    {
      name: 'Popular',
      link: '/popular'
    },
  ]

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
      this.overflowRoute = this.overflowRouteNames.includes(data['name'])
    })
  }
}
