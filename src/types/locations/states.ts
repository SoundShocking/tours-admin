import { ILocationCountry, ISEO } from '@/types'

export interface ILocationState {
  api_id: null | number
  bottom_content: string
  content: string
  id: number
  in_search: number
  key: string
  latitude: string
  longitude: string
  name: string
  parent: ILocationCountry | null
  seo?: ISEO | null
  slug: string
  type: 'state'
}

export interface IGetLocationsStateParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
  type: string
}
