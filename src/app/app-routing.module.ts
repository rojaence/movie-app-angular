import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { MediaDetailsComponent } from './pages/media-details/media-details.component';
import { MediaSearchComponent } from './pages/media-search/media-search.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { DiscoverMediaComponent } from './pages/discover-media/discover-media.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { PopularComponent } from './pages/popular/popular.component';


const routes: Routes = [
  {
    path: 'notfound',
    component: NotFoundComponent,
    data: {
      name: 'notFound'
    }
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
    data: {
      name: 'home'
    }
  },
  {
    path: 'movie/:id',
    component: MediaDetailsComponent,
    title: 'Movie',
    data: {
      name: 'movieDetails'
    }
  },
  {
    path: 'tv/:id',
    component: MediaDetailsComponent,
    title: 'Tv Serie',
    data: {
      name: 'tvDetails'
    }
  },
  {
    path: 'person/:id',
    component: PersonDetailsComponent,
    title: 'People',
    data: {
      name: 'personDetails'
    }
  },
  {
    path: 'search',
    component: MediaSearchComponent,
    title: 'Search media',
    data: {
      name: 'search'
    }
  },
  {
    path: 'movies',
    component: DiscoverMediaComponent,
    title: 'Discover Movies',
    data: {
      name: 'movies',
      mediaType: 'movie'
    }
  },
  {
    path: 'tv',
    component: DiscoverMediaComponent,
    title: 'Discover Tv Series',
    data: {
      name: 'tv',
      mediaType: 'tv'
    }
  },
  {
    path: 'trending',
    component: TrendingComponent,
    title: 'Trending',
    data: {
      name: 'trending',
    }
  },
  {
    path: 'popular',
    component: PopularComponent,
    title: 'Popular',
    data: {
      name: 'popular',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
