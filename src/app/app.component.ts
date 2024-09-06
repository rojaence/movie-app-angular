import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PAGE_MAIN_TITLE_MAP } from './constants/common-values';
import { PageTitleEnum } from './models/enums';


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
      name: PAGE_MAIN_TITLE_MAP[PageTitleEnum.home],
      link: '/'
    },
    {
      name: PAGE_MAIN_TITLE_MAP[PageTitleEnum.movies],
      link: '/movies'
    },
    {
      name: PAGE_MAIN_TITLE_MAP[PageTitleEnum.tv],
      link: '/tv'
    },
    {
      name: PAGE_MAIN_TITLE_MAP[PageTitleEnum.trending],
      link: '/trending'
    },
    {
      name: PAGE_MAIN_TITLE_MAP[PageTitleEnum.popular],
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
