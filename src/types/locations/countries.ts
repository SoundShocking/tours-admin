import { ICurrency, ILocationContinent, IMediaFile, ISEO } from '@/types'

export interface ILocationCountry {
  api_id: number
  bottom_content: string
  content: string
  country_code: string
  currency: ICurrency | null
  electricity_outlets: string[]
  geoname_id: number
  id: number
  in_search: number
  key: string
  latitude: string
  longitude: string
  name: string
  parent: ILocationContinent | null
  seo?: ISEO | null
  slug: string
  thumb: IMediaFile | null
  title_in_search: string
  type: 'country'
  vaccination: string
}

export interface IGetLocationsCountriesParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
  type: string
}
