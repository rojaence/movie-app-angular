import { IMediaResponse, ITv } from "./interfaces";

export class Tv implements ITv {
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
    public voteCount: number,
    public originCountry: string[],
    public firstAirDate: Date,
    public name: string
  ) {}
}

export class TvResponse implements IMediaResponse<Tv> {
  constructor (
    public page: number,
    public results: Tv[],
    public totalPages: number,
    public totalResults: number
  ) {}
}
