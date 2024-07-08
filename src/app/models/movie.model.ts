import { environment } from '../../environments/environment';
import { MediaTypeEnum } from './enums';
import { IMovie, IMediaResponse, IMediaCard, IWithGenre } from './interfaces';
import { plainToClass } from 'class-transformer';

export class Movie implements IMovie, IWithGenre<number> {
  public adult: boolean;
  public genres: number[];
  public backdropPath: string;
  public id: number;
  public originalLanguage: string;
  public originalTitle: string;
  public overview: string;
  public popularity: number;
  public posterPath: string;
  public releaseDate: Date;
  public title: string;
  public voteAverage: number;
  public voteCount: number;
  public video: boolean;

  constructor(
    adult: boolean,
    genres: number[],
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
    this.genres = genres;
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
      imageUri: this.posterPath ? `${environment.imageCdn}/w300/${this.posterPath}` : "",
      mediaType: MediaTypeEnum.movie,
    }
  }
}

export class MovieResponse implements IMediaResponse<Movie> {
  page: number;
  results: Movie[];
  totalResults: number;
  totalPages: number
  constructor (
    { page, totalPages, results, totalResults }: IMediaResponse<IMovie>
  ) {
    this.page = page;
    this.results = results.map(m => Movie.fromApiResponse(m));
    this.totalResults = totalResults;
    this.totalPages = totalPages;
  }
}
