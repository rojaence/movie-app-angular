import { MediaTypeToggleItem } from "../../models/interfaces";

export const movieSortItems: MediaTypeToggleItem<string>[] = [
  {
    value: 'popularity.asc',
    viewValue: $localize `:Popularity asc label@@popularityAsc:Popularity asc.`,
  },
  {
    value: 'popularity.desc',
    viewValue: $localize `:Popularity desc label@@popularityDesc:Popularity desc.`,
  },
  {
    value: 'primary_release_date.asc',
    viewValue: $localize `:Release date asc label@@releaseDateAsc:Release date asc.`,
  },
  {
    value: 'primary_release_date.desc',
    viewValue: $localize `:Release date desc label@@releaseDateDesc:Release date desc.`,
  },
  {
    value: 'vote_average.asc',
    viewValue: $localize `:Rating asc label@@ratingAsc:Rating asc.`,
  },
  {
    value: 'vote_average.desc',
    viewValue: $localize `:Ratind desc label@@ratingDesc:Rating desc.`,
  }
]

export const tvSortItems: MediaTypeToggleItem<string>[] = [
  {
    value: 'popularity.asc',
    viewValue: $localize `:@@popularityAsc:Popularity asc.`,
  },
  {
    value: 'popularity.desc',
    viewValue: $localize `:@@popularityDesc:Popularity desc.`,
  },
  {
    value: 'first_air_date.asc',
    viewValue: $localize `:@@releaseDateAsc:Release date asc.`,
  },
  {
    value: 'first_air_date.desc',
    viewValue: $localize `:@@releaseDateDesc:Release date desc.`,

  },
  {
    value: 'vote_average.asc',
    viewValue: $localize `:@@ratingAsc:Rating asc.`,
  },
  {
    value: 'vote_average.desc',
    viewValue: $localize `:@@ratingDesc:Rating desc.`,
  }
]
