import { environment } from '../../environments/environment';
import { MediaTypeEnum } from "./enums";
import { IMediaCard, IMediaResponse, ITv } from "./interfaces";
import { plainToClass, Expose } from 'class-transformer';

export class Tv implements ITv {  public adult: boolean;
  public genreIds: string[];
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
  public firstAirDate: Date;

  constructor(
    adult: boolean,
    genreIds: string[],
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
    firstAirDate: Date,
    name: string
  ) {
    this.adult = adult;
    this.genreIds = genreIds;
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
      title: this.name,
      contentUri: '#',
      imageUri: `${environment.imageCdn}/w300/${this.posterPath}`,
      mediaType: MediaTypeEnum.tv,
    }
  }
}

export class TvResponse implements IMediaResponse<Tv> {
  constructor (
    public page: number,
    public results: Tv[],
    public totalPages: number,
    public totalResults: number
  ) {}
}
