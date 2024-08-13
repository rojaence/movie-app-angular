import { MediaTypeToggleItem } from "../../models/interfaces";

export const movieSortItems: MediaTypeToggleItem<string>[] = [
  {
    value: 'popularity.asc',
    viewValue: 'Popularity asc.'
  },
  {
    value: 'popularity.desc',
    viewValue: 'Popularity desc.'
  },
  {
    value: 'primary_release_date.asc',
    viewValue: 'Release date asc.'
  },
  {
    value: 'primary_release_date.desc',
    viewValue: 'Release date desc.'
  },
  {
    value: 'vote_average.asc',
    viewValue: 'Rating asc.'
  },
  {
    value: 'vote_average.desc',
    viewValue: 'Rating desc.'
  }
]

export const tvSortItems: MediaTypeToggleItem<string>[] = [
  {
    value: 'popularity.asc',
    viewValue: 'Popularity asc.'
  },
  {
    value: 'popularity.desc',
    viewValue: 'Popularity desc.'
  },
  {
    value: 'first_air_date.asc',
    viewValue: 'Release date asc.'
  },
  {
    value: 'first_air_date.desc',
    viewValue: 'Release date desc.'
  },
  {
    value: 'vote_average.asc',
    viewValue: 'Rating asc.'
  },
  {
    value: 'vote_average.desc',
    viewValue: 'Rating desc.'
  }
]
