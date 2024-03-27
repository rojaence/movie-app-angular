import { environment } from '../../environments/environment';
import { MediaType } from "./enums";
import { IMediaCard, IMediaResponse, ITv } from "./interfaces";
import { plainToClass, Expose } from 'class-transformer';

export class Tv implements ITv {
  @Expose({ name: 'adult' })
  public adult: boolean;

  @Expose({ name: 'genre_ids' })
  public genreIds: string[];

  @Expose({ name: 'backdrop_path' })
  public backdropPath: string;

  @Expose({ name: 'id' })
  public id: number;

  @Expose({ name: 'original_languages' })
  public originalLanguages: string[];

  @Expose({ name: 'original_title' })
  public originalTitle: string;

  @Expose({ name: 'overview' })
  public overview: string;

  @Expose({ name: 'popularity' })
  public popularity: number;

  @Expose({ name: 'poster_path' })
  public posterPath: string;

  @Expose({ name: 'release_date' })
  public releaseDate: Date;

  @Expose({ name: 'title' })
  public title: string;

  @Expose({ name: 'vote_average' })
  public voteAverage: number;

  @Expose({ name: 'vote_count' })
  public voteCount: number;

  @Expose({ name: 'origin_country' })
  public originCountry: string[]

  @Expose({ name: 'first_air_date' })
  public firstAirDate: Date;

  @Expose({ name: 'name' })
  public name: string;

  constructor(
    adult: boolean,
    genreIds: string[],
    backdropPath: string,
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
    originCountry: string[],
    firstAirDate: Date,
    name: string
  ) {
    this.adult = adult;
    this.genreIds = genreIds;
    this.backdropPath = backdropPath;
    this.id = id;
    this.originalLanguages = originalLanguages;
    this.originalTitle = originalTitle;
    this.overview = overview;
    this.popularity = popularity;
    this.posterPath = posterPath;
    this.releaseDate = releaseDate;
    this.title = title;
    this.voteAverage = voteAverage;
    this.voteCount = voteCount;
    this.originCountry = originCountry;
    this.firstAirDate = firstAirDate;
    this.name = name
  }

  static fromApiResponse(data: ITv): Tv {
    return plainToClass(Tv, data);
  }

  getMediaCardData(): IMediaCard {
    return {
      title: this.title,
      contentUri: '#',
      imageUri: `${environment.imageCdn}/w300/${this.posterPath}`,
      mediaType: MediaType.movie,
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
