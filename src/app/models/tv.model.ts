import { environment } from '../../environments/environment';
import { MediaTypeEnum } from "./enums";
import { IMediaCard, IMediaResponse, ITv, IWithGenre } from "./interfaces";
import { plainToClass } from 'class-transformer';

export class Tv implements ITv, IWithGenre<number> {
  public adult: boolean;
  public genres: number[];
  public backdropPath: string;
  public id: number;
  public originalLanguage: string;
  public originalName: string;
  public overview: string;
  public popularity: number;
  public posterPath: string;
  public name: string;
  public voteAverage: number;
  public voteCount: number;
  public originCountry: string[]
  public firstAirDate: Date | string;

  constructor(
    adult: boolean,
    genres: number[],
    backdropPath: string,
    id: number,
    originalLanguage: string,
    originalName: string,
    overview: string,
    popularity: number,
    posterPath: string,
    voteAverage: number,
    voteCount: number,
    originCountry: string[],
    firstAirDate: Date | string,
    name: string
  ) {
    this.adult = adult;
    this.genres = genres;
    this.backdropPath = backdropPath;
    this.id = id;
    this.originalLanguage = originalLanguage;
    this.originalName = originalName;
    this.overview = overview;
    this.popularity = popularity;
    this.posterPath = posterPath;
    this.name = name;
    this.voteAverage = voteAverage;
    this.voteCount = voteCount;
    this.originCountry = originCountry;
    this.firstAirDate = firstAirDate;
  }

  static fromApiResponse(data: ITv): Tv {
    return plainToClass(Tv, data);
  }

  getMediaCardData(): IMediaCard {
    return {
      id: this.id,
      title: this.name,
      contentUri: '#',
      imageUri: this.posterPath ? `${environment.imageCdn}/w300/${this.posterPath}` : "",
      mediaType: MediaTypeEnum.tv,
    }
  }
}

export class TvResponse implements IMediaResponse<Tv> {
  page: number;
  results: Tv[];
  totalResults: number;
  totalPages: number
  constructor (
    { page, totalPages, results, totalResults }: IMediaResponse<ITv>
  ) {
    this.page = page;
    this.results = results.map(m => Tv.fromApiResponse(m));
    this.totalResults = totalResults;
    this.totalPages = totalPages;
  }
}
