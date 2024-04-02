export interface IAccommodationType {
  accommodation_type: string
  id: number
  nights?: null | number
  type: string
}

export interface GetAccommodationTypesParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
