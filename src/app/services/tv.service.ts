import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IGenreResponse, IImageGallery, IMediaResponse, ITv, ITvDetails, IVideoGallery } from '../models/interfaces';
import { TimeWindowEnum } from '../models/enums';
import { TvResponse } from '../models/tv.model';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  private apiUrl = `${environment.apiUrl}/tv`;

  constructor(private http: HttpClient) { }

  getAll(page: number = 1, genres: number[] = [], sortBy: string = "popularity.desc"): Observable<TvResponse> {
    return this.http.get<IMediaResponse<ITv>>(this.apiUrl, {
      params: {
        page,
        genres: genres.join(','),
        sortBy
      }
    })
    .pipe(
      map(response => {
        return new TvResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getPopular(page: number = 1): Observable<TvResponse> {
    return this.http.get<IMediaResponse<ITv>>(this.apiUrl + '/popular', {
      params: {
        page
      }
    })
    .pipe(
      map(response => {
        return new TvResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getTrending(timeWindow: TimeWindowEnum = TimeWindowEnum.day, page = 1): Observable<TvResponse> {
    return this.http.get<IMediaResponse<ITv>>(this.apiUrl + '/trending', {
      params: {
        timeWindow,
        page
      }
    })
    .pipe(
      map(response => {
        return new TvResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getDetails(id: number): Observable<ITvDetails> {
    return this.http.get<ITvDetails>(this.apiUrl + `/${id}`).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getRecommendations(id: number): Observable<TvResponse> {
    return this.http.get<TvResponse>(this.apiUrl + `/${id}/recommendations`).pipe(
      map(response => {
        return new TvResponse(response);
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

  search(query: string = "", page: number = 1): Observable<TvResponse> {
    return this.http.get<TvResponse>(this.apiUrl + '/search', {
      params: {
        query,
        page
      }
    }).pipe(
      map(response => new TvResponse(response)),
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
