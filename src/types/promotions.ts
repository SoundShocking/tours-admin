export interface IPromotion {
  api_id: string
  id: number
  name: string
  pax_restriction: null
  valid_to: string
  value: number
  value_type: string
}

export interface IGetPromotionsParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
