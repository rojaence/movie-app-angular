import { IMovie, IWithGenre } from "./interfaces";
import { Genre } from "./genre.model";

export class MovieDetails implements IMovie, IWithGenre<Genre> {
  adult: boolean;
  backdropPath: string;
  id: number;
  originalLanguage: string;
  overview: string;
  popularity: number;
  posterPath: string;
  voteAverage: number;
  voteCount: number;
  video: boolean
  genres: Genre[];
  title: string;
  originalTitle: string;
  releaseDate: Date;

  constructor(
    adult: boolean,
    genres: Genre[],
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
    video: boolean,
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
}
