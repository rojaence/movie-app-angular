import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../models/movie.model';
import { IMediaService } from '../models/interfaces';
import { TimeWindowEnum } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class MovieService implements IMediaService<MovieResponse> {

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/movie');
  }

  getPopular(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/popular/movie');
  }

  getTrending(timeWindow: TimeWindowEnum = TimeWindowEnum.day): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/trending/movie', {
      params: {
        timeWindow
      }
    });
  }
}
