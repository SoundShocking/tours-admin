import { ILocationCountry, ISEO } from '@/types'

export interface ILocationRegion {
  api_id: null | number
  bottom_content: string
  content: string
  id: number
  in_search: number
  key: string
  latitude: null | string
  longitude: null | string
  name: string
  parent: ILocationCountry | null
  seo?: ISEO | null
  slug: string
  type: 'region'
}

export interface IGetLocationsRegionsParams {
  by: null | string
  order: null | string
  page: number
  parent: null | number
  'per-page': number | string
  search: null | string
  type: string
}
