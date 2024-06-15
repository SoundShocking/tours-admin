import { ILocationCity, ILocationRegion } from '@/types/locations'
import { IMediaFile } from '@/types/media'
import { IOperator } from '@/types/operators'
import { ISEO } from '@/types/seo'
import { IType } from '@/types/types'

export interface ITour {
  age_range: {
    recommended: { max_age: number; min_age: number } | null
    strict: { max_age: number; min_age: number } | null
  }
  api_id: string
  banner: IMediaFile | null
  codes: string[]
  content: string
  discount: number
  hot: number
  id: number
  low_price: number
  max_group_size: number
  publish_status: string
  ratings: ITourRating
  relevance: string[]
  reviews_count: number
  services: []
  slug: string
  tour_length_days: number
  tour_name: string
  url: string
}

export interface ITourDetailed {
  age_range: {
    recommended: { max_age: number; min_age: number } | null
    strict: { max_age: number; min_age: number } | null
  }
  api_id: string
  banner: IMediaFile | null
  brochure: IMediaFile | null
  codes: string[]
  content: string
  discount: number
  gallery: IMediaFile[] | null
  // guide_languages: IGuide[]
  hot: number
  id: number
  itinerary: ITourItinerary[]
  locations: ILocationCity[]
  low_price: number
  max_group_size: number
  nature_locations: ILocationRegion[]
  operator: IOperator | null
  publish_status: string
  ratings: ITourRating
  relevance: string[]
  reviews_count: number
  seo: ISEO | null
  services: []
  slug: string
  tour_length_days: number
  tour_name: string
  tour_points: ITourPoints[]
  tour_types: IType[]
  url: string
}

export interface IGetToursParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  publish_status: null | string
  search: null | string
}

export interface IGetToursInfiniteParams {
  page: number
  'per-page': number | string
  search: null | string
}

interface ITourRating {
  accommodation: null | number
  food: null | number
  guide: null | number
  itinerary: null | number
  operator: null | number
  overall: null | number
  transport: null | number
}

interface ITourItinerary {
  description: string
  duration: number
  id: number
  order: number
  title: string[]
  tour_id: number
}

interface ITourPoints {
  address: string
  id: number
  key: string
  name: string
  time: null | string
}

export interface IRelatedTour {
  id: number
  tour_name: string
}
