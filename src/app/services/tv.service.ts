import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IImageGallery, ITvDetails, IVideoGallery } from '../models/interfaces';
import { TimeWindowEnum } from '../models/enums';
import { TvResponse } from '../models/tv.model';
import { TvDetails } from '../models/tv-details.model';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TvResponse> {
    return this.http.get<TvResponse>(environment.apiUrl + '/tv');
  }

  getPopular(): Observable<TvResponse> {
    return this.http.get<TvResponse>(environment.apiUrl + '/popular/tv');
  }

  getTrending(timeWindow: TimeWindowEnum = TimeWindowEnum.day): Observable<TvResponse> {
    return this.http.get<TvResponse>(environment.apiUrl + '/trending/tv', {
      params: {
        timeWindow
      }
    });
  }
  getDetails(id: number): Observable<ITvDetails> {
    return this.http.get<ITvDetails>(environment.apiUrl + `/tv/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('Resource not found'));
        } else {
          return throwError(() => new Error('Unknown error'));
        }
      })
    );
  }

  getRecommendations(id: number): Observable<TvResponse> {
    return this.http.get<TvResponse>(environment.apiUrl + `/tv/${id}/recommendations`).pipe(
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
    return this.http.get<IImageGallery>(environment.apiUrl + `/tv/${id}/images`
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message));
      })
    )
  }

  getVideoGallery(id: number): Observable<IVideoGallery> {
    return this.http.get<IVideoGallery>(environment.apiUrl + `/tv/${id}/videos`
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message));
      })
    )
  }
}
