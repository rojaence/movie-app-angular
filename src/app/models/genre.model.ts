import { Expose } from "class-transformer";
import { IGenre } from "./interfaces";

export class Genre implements IGenre {
  @Expose({ name: 'id' })
  id: number;
  @Expose({ name: 'name' })
  name: string;

  constructor(id: number, name: string) {
    this.id = id,
    this.name = name
  }
}
