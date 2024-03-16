import { IMedia, IMovie, IMediaResponse } from './interfaces';

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
}

export class MovieResponse implements IMediaResponse<Movie> {
  constructor (
    public page: number,
    public results: Movie[],
    public totalPages: number,
    public totalResults: number
  ) {}
}
