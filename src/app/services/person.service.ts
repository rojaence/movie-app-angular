import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IMediaResponse, IMovieCast, IMovieCrew, IPerson, IPersonCredit, IPersonDetails, ITvCast, ITvCrew } from '../models/interfaces';
import { PersonResponse } from '../models/person.model';
import { TimeWindowEnum } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getDetails(id: number): Observable<IPersonDetails> {
    return this.http.get<IPersonDetails>(environment.apiUrl + `/person/${id}`).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  getMovieCredits(id: number): Observable<IPersonCredit<IMovieCast, IMovieCrew>> {
    return this.http.get<IPersonCredit<IMovieCast, IMovieCrew>>(environment.apiUrl + `/person/${id}/credits/movie`)
    .pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }

  getTvCredits(id: number): Observable<IPersonCredit<ITvCast, ITvCrew>> {
    return this.http.get<IPersonCredit<ITvCast, ITvCrew>>(environment.apiUrl + `/person/${id}/credits/tv`)
    .pipe(
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }

  getTrending(timeWindow: TimeWindowEnum = TimeWindowEnum.day, page = 1): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(environment.apiUrl + '/trending/person', {
      params: {
        timeWindow,
        page
      }
    }).pipe(
      map(response => {
        return new PersonResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }

  getPopular(page: number = 1): Observable<PersonResponse> {
    return this.http.get<IMediaResponse<IPerson>>(environment.apiUrl + '/popular/person', {
      params: {
        page
      }
    })
    .pipe(
      map(response => {
        return new PersonResponse(response);
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    );
  }

  search(query: string, page: number = 1): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(environment.apiUrl + '/search/person', {
      params: {
        query,
        page
      }
    }).pipe(
      map(response => new PersonResponse(response)),
      catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
    )
  }
}
