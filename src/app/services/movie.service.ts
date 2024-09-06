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

  private apiUrl = `${environment.apiUrl}/movies`;

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(page: number = 1, genres: number[] = [], sortBy: string = "popularity.desc"): Observable<MovieResponse> {
    return this.http.get<IMediaResponse<IMovie>>(this.apiUrl, {
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

  getPopular(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(this.apiUrl + '/popular', {
      params: {
        page
      }
    }).pipe(
      map(response => {
        return new MovieResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getTrending(timeWindow: TimeWindowEnum = TimeWindowEnum.day, page = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(this.apiUrl + '/trending', {
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
    return this.http.get<IMovieDetails>(this.apiUrl + `/${id}`).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getRecommendations(id: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(this.apiUrl + `/${id}/recommendations`).pipe(
      map(response => {
        return new MovieResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getImageGallery(id: number): Observable<IImageGallery> {
    return this.http.get<IImageGallery>(this.apiUrl + `/${id}/images`
    ).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }

  getVideoGallery(id: number): Observable<IVideoGallery> {
    return this.http.get<IVideoGallery>(this.apiUrl + `/${id}/videos`
    ).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }

  search(query: string = "", page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(this.apiUrl + '/search', {
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
    return this.http.get<IGenreResponse>(this.apiUrl + `/genres`
    ).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }
}
