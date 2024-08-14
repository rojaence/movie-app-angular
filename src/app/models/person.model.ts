import { plainToClass } from "class-transformer";
import { IMediaAppearances, IMediaCard, IMediaResponse, IPerson } from "./interfaces";
import { environment } from "../../environments/environment";
import { MediaTypeEnum } from "./enums";

export class Person implements IPerson {
  knownFor: IMediaAppearances;
  adult: boolean;
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string;

  constructor(
    knownFor: IMediaAppearances,
    adult: boolean,
    gender: number,
    id: number,
    knownForDepartment: string,
    name: string,
    originalName: string,
    popularity: number,
    profilePath: string,
  ) {
    this.knownFor = knownFor,
    this.adult = adult,
    this.gender = gender,
    this.id = id,
    this.knownForDepartment = knownForDepartment,
    this.name = name,
    this.originalName = originalName,
    this.popularity = popularity,
    this.profilePath = profilePath
  }

  static fromApiResponse(data: IPerson): Person {
    return plainToClass(Person, data)
  }

  getMediaCardData(): IMediaCard {
    return {
      id: this.id,
      title: this.name,
      contentUri: '#',
      imageUri: this.profilePath ? `${environment.imageCdn}/w300/${this.profilePath}` : "",
      mediaType: MediaTypeEnum.person
    }
  }
}

export class PersonResponse implements IMediaResponse<Person> {
  page: number;
  results: Person[];
  totalResults: number;
  totalPages: number
  constructor (
    { page, totalPages, results, totalResults }: IMediaResponse<IPerson>
  ) {
    this.page = page;
    this.results = results.map(m => Person.fromApiResponse(m));
    this.totalResults = totalResults;
    this.totalPages = totalPages;
  }
}
