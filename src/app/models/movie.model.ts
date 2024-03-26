import { MediaType } from './enums';
import { IMovie, IMediaResponse, IMediaCard } from './interfaces';

export class Movie implements IMovie {
  constructor (
    public adult: boolean,
    public backdropPath: string,
    public genreIds: string[],
    public id: number,
    public originalLanguage: string,
    public originalTitle: string,
    public overview: string,
    public popularity: number,
    public posterPath: string,
    public releaseDate: Date,
    public title: string,
    public voteAverage: number,
    public voteCount: number
  ) {}

  static fromApiResponse(data: IMovie): Movie {
    return new Movie(
      data.adult,
      data.backdropPath,
      data.genreIds,
      data.id,
      data.originalLanguage,
      data.originalTitle,
      data.overview,
      data.popularity,
      data.posterPath,
      new Date(data.releaseDate),
      data.title,
      data.voteAverage,
      data.voteCount
    );
  }

  getMediaCardData(): IMediaCard {
    return {
      title: this.title,
      contentUri: '#',
      imageUri: this.posterPath,
      mediaType: MediaType.movie,
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
