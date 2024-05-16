import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MovieResponse } from '../models/movie.model';
import { IMediaService, IMovieDetails } from '../models/interfaces';
import { TimeWindowEnum } from '../models/enums';
import { MovieDetails } from '../models/movie-details.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService implements IMediaService<MovieResponse> {

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/movie').pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Resource not found'));
        } else {
          return throwError(() => new Error('Unknown error'));
        }
      })
    );
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

  getDetails(id: number) {
    return this.http.get<IMovieDetails>(environment.apiUrl + `/movie/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Resource not found'));
        } else {
          return throwError(() => new Error('Unknown error'));
        }
      })
    );
  }
}
