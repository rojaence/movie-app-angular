import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../models/movie.model';
import { IMediaService } from '../models/interfaces';
import { TimeWindow } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class MovieService implements IMediaService<MovieResponse> {

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/movies');
  }

  getPopular(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/popular/movies');
  }

  getTrending(timeWindow: TimeWindow = TimeWindow.day): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/trending/movies', {
      params: {
        timeWindow
      }
    });
  }
}
