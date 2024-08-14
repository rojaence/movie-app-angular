import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { MovieResponse } from '../models/movie.model';
import { IGenreResponse, IImageGallery, IMediaResponse, IMovie, IMovieDetails, IVideoGallery } from '../models/interfaces';
import { TimeWindowEnum } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(page: number = 1, genres: number[] = [], sortBy: string = "popularity.desc"): Observable<MovieResponse> {
    return this.http.get<IMediaResponse<IMovie>>(environment.apiUrl + '/movie', {
      params: {
        page,
        genres: genres.join(','),
        sortBy
      }
    })
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

  getTrending(timeWindow: TimeWindowEnum = TimeWindowEnum.day, page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/trending/movie', {
      params: {
        timeWindow,
        page
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

  search(query: string, page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(environment.apiUrl + '/search/movie', {
      params: {
        query,
        page
      }
    }).pipe(
      map(response => new MovieResponse(response)),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }

  getGenres(): Observable<IGenreResponse> {
    return this.http.get<IGenreResponse>(environment.apiUrl + `/genre/movie`
    ).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }
}
