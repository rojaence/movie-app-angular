import { ITv, IWithGenre } from "./interfaces";
import { Genre } from "./genre.model";

export class TvDetails {
  id: number;
  inProduction: boolean;

  constructor(
    id: number,
    inProduction: boolean
  ) {
    this.id = id;
    this.inProduction = inProduction
  }
}
