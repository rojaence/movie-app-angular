import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MovieResponse } from '../models/movie.model';
import { IImageGallery, IMovieDetails } from '../models/interfaces';
import { TimeWindowEnum } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

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

  getDetails(id: number): Observable<IMovieDetails> {
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

  getRecommendations(id: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + `/movie/${id}/recommendations`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Resource not found'));
        } else {
          return throwError(() => new Error('Unknown error'));
        }
      })
    );
  }

  getImageGallery(id: number): Observable<IImageGallery> {
    return this.http.get<IImageGallery>(environment.apiUrl + `/movie/${id}/images`
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message));
      })
    )
  }
}
