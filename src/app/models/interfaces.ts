import { Observable } from "rxjs";
import { TimeWindow, MediaType } from "./enums";

export interface IMedia
{
  adult: boolean,
  backdropPath: string,
  genreIds: string[],
  id: number,
  originalLanguages: string[],
  originalTitle: string,
  overview: string,
  popularity: number,
  posterPath: string,
  releaseDate: Date,
  title: string,
  voteAverage: number,
  voteCount: number,
  getMediaCardData(): IMediaCard
}

export interface IMovie extends IMedia {}

export interface ITv extends IMedia {
  originCountry: string[],
  firstAirDate: Date,
  name: string
}

export interface IMediaResponse<TMedia> {
  page: number,
  results: TMedia[],
  totalPages: number,
  totalResults: number
}

export interface LanguageOption {
  value: string,
  viewValue: string,
  viewValueShort: string
}

export interface IMediaService<TResponse>
{
  getAll(): Observable<TResponse>;
  getTrending(timeWindow: TimeWindow): Observable<TResponse>;
  getPopular(): Observable<TResponse>;
}

export interface IMediaCard {
  title: string,
  mediaType: MediaType,
  imageUri: string,
  contentUri: string
}
