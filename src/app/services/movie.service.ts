import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { MovieResponse } from '../models/movie.model';
import { IImageGallery, IMediaResponse, IMovie, IMovieDetails, IVideoGallery } from '../models/interfaces';
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
    return this.http.get<IMediaResponse<IMovie>>(environment.apiUrl + '/movie')
    .pipe(
      map(response => {
        return new MovieResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getPopular(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/popular/movie').pipe(
      map(response => {
        return new MovieResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getTrending(timeWindow: TimeWindowEnum = TimeWindowEnum.day): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/trending/movie', {
      params: {
        timeWindow
      }
    }).pipe(
      map(response => {
        return new MovieResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }

  getDetails(id: number): Observable<IMovieDetails> {
    return this.http.get<IMovieDetails>(environment.apiUrl + `/movie/${id}`).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getRecommendations(id: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + `/movie/${id}/recommendations`).pipe(
      map(response => {
        return new MovieResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getImageGallery(id: number): Observable<IImageGallery> {
    return this.http.get<IImageGallery>(environment.apiUrl + `/movie/${id}/images`
    ).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }

  getVideoGallery(id: number): Observable<IVideoGallery> {
    return this.http.get<IVideoGallery>(environment.apiUrl + `/movie/${id}/videos`
    ).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }

  search(query: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/search/movie', {
      params: {
        query
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }
}
