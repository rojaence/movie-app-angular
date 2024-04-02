import { environment } from '../../environments/environment';
import { MediaTypeEnum } from './enums';
import { IMovie, IMediaResponse, IMediaCard } from './interfaces';
import { plainToClass, Expose } from 'class-transformer';

export class Movie implements IMovie {
  @Expose({ name: 'adult' })
  public adult: boolean;

  @Expose({ name: 'genre_ids' })
  public genreIds: string[];

  @Expose({ name: 'backdrop_path' })
  public backdropPath: string;

  @Expose({ name: 'id' })
  public id: number;

  @Expose({ name: 'original_language' })
  public originalLanguage: string;

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

  @Expose({ name: 'video' })
  public video: boolean;

  constructor(
    adult: boolean,
    genreIds: string[],
    backdropPath: string,
    id: number,
    originalLanguage: string,
    originalTitle: string,
    overview: string,
    popularity: number,
    posterPath: string,
    releaseDate: Date,
    title: string,
    voteAverage: number,
    voteCount: number,
    video: boolean
  ) {
    this.adult = adult;
    this.genreIds = genreIds;
    this.backdropPath = backdropPath;
    this.id = id;
    this.originalLanguage = originalLanguage;
    this.originalTitle = originalTitle;
    this.overview = overview;
    this.popularity = popularity;
    this.posterPath = posterPath;
    this.releaseDate = releaseDate;
    this.title = title;
    this.voteAverage = voteAverage;
    this.voteCount = voteCount;
    this.video = video
  }

  static fromApiResponse(data: IMovie): Movie {
    return plainToClass(Movie, data);
  }

  getMediaCardData(): IMediaCard {
    return {
      title: this.title,
      contentUri: '#',
      imageUri: `${environment.imageCdn}/w300/${this.posterPath}`,
      mediaType: MediaTypeEnum.movie,
    }
  }
}

export class MovieResponse implements IMediaResponse<Movie> {
  constructor (
    public page: number,
    public results: Movie[],
    public totalPages: number,
    public totalResults: number
  ) {}
}
