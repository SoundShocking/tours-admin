import { ILocationState, ISEO } from '@/types'

export interface ILocationCity {
  api_id: number
  bottom_content: string
  content: string
  country_id: null | number
  geoname_id: null | number
  id: number
  in_search: number
  key: string
  latitude: null | string
  longitude: null | string
  name: string
  parent: ILocationState | null
  seo?: ISEO | null
  slug: string
  type: 'city'
}

export interface IGetLocationsCitiesParams {
  by: null | string
  country_id: null | number
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
  type: string
}
