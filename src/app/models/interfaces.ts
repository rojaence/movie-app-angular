import { Observable } from "rxjs";
import { TimeWindowEnum, MediaTypeEnum } from "./enums";

export interface IMedia
{
  adult: boolean,
  backdropPath: string,
  genreIds: string[],
  id: number,
  originalLanguage: string,
  overview: string,
  popularity: number,
  posterPath: string,
  voteAverage: number,
  voteCount: number,
  getMediaCardData(): IMediaCard
}

export interface IMovie extends IMedia {
  title: string,
  originalTitle: string,
  releaseDate: Date,
  video: boolean
}

export interface ITv extends IMedia {
  name: string,
  originalName: string,
  originCountry: string[],
  firstAirDate: Date,
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
  getTrending(timeWindow: TimeWindowEnum): Observable<TResponse>;
  getPopular(): Observable<TResponse>;
}

export interface IMediaCard {
  title: string,
  mediaType: MediaTypeEnum,
  imageUri: string,
  contentUri: string
}
