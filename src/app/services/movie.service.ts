import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAll(): Observable<MovieResponse>
  {
    return this.http.get<MovieResponse>(environment.apiUrl + '/movies');
  }
}
