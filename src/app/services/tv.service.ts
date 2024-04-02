import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMediaService } from '../models/interfaces';
import { TimeWindowEnum } from '../models/enums';
import { TvResponse } from '../models/tv.model';

@Injectable({
  providedIn: 'root'
})
export class TvService implements IMediaService<TvResponse> {

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
}
