import { CreditTypeEnum, MediaTypeEnum, PageTitleEnum, TimeWindowEnum } from "../models/enums";
import { MediaTypeToggleItem } from "../models/interfaces";

export const MEDIA_TYPE_MAP:  Record<MediaTypeEnum, MediaTypeToggleItem<MediaTypeEnum>> = {
  movie: {
    value: MediaTypeEnum.movie,
    viewValue: $localize `:Media Type movies@@mediaTypeMovies:Movies`
  },
  tv: {
    value: MediaTypeEnum.tv,
    viewValue: $localize `:Media Type Tv Series@@mediaTypeTv:Tv`
  },
  person: {
    value: MediaTypeEnum.person,
    viewValue: $localize `:Media Type Person@@mediaTypePerson:Person`
  }

}

export const MEDIA_TIME_WINDOW_MAP : Record<TimeWindowEnum, MediaTypeToggleItem<TimeWindowEnum>> = {
  day: {
    value: TimeWindowEnum.day,
    viewValue: $localize `:Today Time@@timeWindowToday:Today`,
  },
  week: {
    value: TimeWindowEnum.week,
    viewValue: $localize `:Week Time@@timeWindowWeek:Week`,
  }
}

export const PAGE_HEADER_TITLE_MAP : Record<PageTitleEnum, string> = {
  home: $localize `:Home page title@@homeHeaderTitle:Home`,
  trending: $localize `:Trending page title@@trendingHeaderTitle:Trending`,
  movies: $localize `:Movies page title@@moviesHeaderTitle:Movies`,
  tv: $localize `:Tv page title@@tvHeaderTitle:Tv/Series`,
  popular: $localize `:Tv page title@@popularHeaderTitle:Popular`,
}

export const PAGE_MAIN_TITLE_MAP : Record<PageTitleEnum, string> = {
  home: $localize `:Home page title@@homeMainTitle:Home`,
  trending: $localize `:Trending page title@@trendingMainTitle:Trending`,
  movies: $localize `:Movies page title@@moviesMainTitle:Movies`,
  tv: $localize `:Tv page title@@tvMainTitle:Tv/Series`,
  popular: $localize `:Tv page title@@popularMainTitle:Popular`
}

export const MEDIA_FILTERS = {
  genre: $localize `:@@genreFilterLabel:Genre`,
  sortBy: $localize `:@@sortByFilterLabel:Sort by`
}

export const CREDIT_TYPES_MAP: Record<CreditTypeEnum, MediaTypeToggleItem<CreditTypeEnum>> = {
  cast: {
    value: CreditTypeEnum.cast,
    viewValue: $localize `:@@creditTypeCast:Cast`
  },
  crew: {
    value: CreditTypeEnum.crew,
    viewValue: $localize `:@@creditTypeCrew:Crew`
  }
}
