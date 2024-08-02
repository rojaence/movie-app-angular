import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPersonDetails } from '../models/interfaces';
import { PersonResponse } from '../models/person.model';

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
