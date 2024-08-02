import { Observable } from "rxjs";
import { TimeWindowEnum, MediaTypeEnum } from "./enums";
import { NumberSymbol } from "@angular/common";

export interface IMedia
{
  adult: boolean,
  backdropPath: string,
  id: number,
  originalLanguage: string,
  overview: string,
  popularity: number,
  posterPath: string,
  voteAverage: number,
  voteCount: number,
}

export interface IMediaFunctions {
  getMediaCardData(): IMediaCard
}

export interface IWithGenre<TGenre> {
  genres: TGenre[]
}

export interface IGenre {
  id: number,
  name: string
}

export interface IMovie extends IMedia {
  title: string,
  originalTitle: string,
  releaseDate: Date | string,
  video: boolean,
}

export interface IProductionCompany {
  id: number,
  logoPath: string,
  name: string,
  origin_country: string
}

export interface IProductionCountry {
  iso31661_1: string,
  name: string,
}

export interface ISpokenLanguage {
  englishName: string,
  iso639_1: string,
  name: string
}

export interface IMovieDetails extends IMovie, IWithGenre<IGenre> {
  homepage: string,
  imbdId: string,
  budget: number,
  productionCompanies: IProductionCompany[],
  productionContries: IProductionCountry[],
  revenue: number,
  runtime: number,
  spokenLanguages: ISpokenLanguage[],
  status: string,
  tagline: string,
  belongsToCollection: ICollection,
}

export interface ITvDetails extends ITv, IWithGenre<IGenre> {
  inProduction: boolean,
  createdBy: IProducer,
  episodeRunTime: number[],
  homepage: string,
  languages: string[],
  lastEpisodeToAir: IEpisode,
  nextEpisodeToAir: IEpisode,
  networks: INetwork[],
  numberOfEpisodes: number,
  numberOfSeasons: number,
  productionCompanies: IProductionCompany[],
  productionCountries: IProductionCompany[],
  spokenLanguages: ISpokenLanguage[],
  status: string,
  tagline: string,
  type: string,
  firstAirDate: Date | string,
  seasons: ISeason[],
}

export interface INetwork {
  id: number,
  logoPath: string,
  name: string,
  originCountry: string
}

export interface IProducer {
  id: number,
  creditId: string,
  name: string,
  originalName: string,
  gender: number,
  profilePath: string
}

export interface IEpisode {
  id: number,
  overview: string,
  name: string,
  voteAverage: number,
  voteCount: number,
  airDate: Date,
  episodeNumber: number,
  episodeType: string,
  productionCode: string,
  runtime: number,
  seasonNumber: number,
  showId: number,
  stillPath: string
}

export interface ISeason {
  id: number,
  airDate: Date,
  episodeCount: number,
  name: string,
  overview: string,
  posterPath: string,
  seasonNumber: number,
  voteAverage: number
}

export interface ICollection {
  id:            number;
  name:          string;
  poster_path:   string;
  backdrop_path: string;
}

export interface ITv extends IMedia {
  name: string,
  originalName: string,
  originCountry: string[],
  firstAirDate: Date | string,
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

/* export interface IMediaService<TResponse>
{
  getAll(): Observable<TResponse>;
  getTrending(timeWindow: TimeWindowEnum): Observable<TResponse>;
  getPopular(): Observable<TResponse>;
  getDetails(id: number): Observable<TResponse>;
  getRecommendations(id: number): Observable<TResponse>;
} */

export interface IMediaCard {
  id: number,
  title: string,
  mediaType: MediaTypeEnum,
  imageUri: string,
  contentUri: string
}

export interface MediaTypeToggleItem<T> {
  value: T,
  viewValue: string
}

export interface IMediaInfo {
  id: number,
  title: string,
  overview: string,
  voteAverage: number,
  genres: IGenre[],
  posterPath: string,
  release: Date | string,
  mediaType: MediaTypeEnum,
  tagline: string,
}

export interface IImageGallery {
  id: number,
  backdrops: IImageResource[],
  posters: IImageResource[],
  logos: IImageResource[]
}

export interface IImageResource {
  aspectRatio: number;
  height:       number;
  iso639_1:   string | null;
  filePath:    string;
  voteAverage: number;
  voteCount:   number;
  width:        number;
}

export interface IVideoGallery {
  id: number;
  results: IVideoResource[]
}

export interface IVideoResource {
  iso639_1:   string;
  iso3166_1:  string;
  name:       string;
  key:        string;
  site:       string;
  size:       number;
  type:       string;
  official:   boolean;
  publishedAt: Date | string;
  id:         string;
}


export interface IQueryParams {
  query: string,
  page: number,
  mediaType: MediaTypeEnum
}

export interface IMediaAppearances {
  movies: IMovie[],
  tvSeries: ITv[]
}

export interface IBasePerson {
  adult:              boolean;
  gender:             number;
  id:                 number;
  knownForDepartment: string;
  name:               string;
  originalName:       string;
  popularity:         number;
  profilePath:        string;
}

export interface IPerson extends IBasePerson {
  knownFor: IMediaAppearances;
}

export interface IPersonDetails extends IBasePerson {
  alsoKnownAs:        string[];
  biography:          string;
  birthday:           Date | string;
  deathday:           Date | string;
  homepage:           string;
  imdbId:             string;
  placeOfBirth:       string;
}
