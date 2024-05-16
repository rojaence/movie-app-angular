import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { MediaDetailsComponent } from './pages/media-details/media-details.component';


const routes: Routes = [
  {
    path: 'notfound',
    component: NotFoundComponent,
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'movie/:id',
    component: MediaDetailsComponent,
    title: 'Movie'
  },
  {
    path: 'tv/:id',
    component: MediaDetailsComponent,
    title: 'Tv Serie'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
