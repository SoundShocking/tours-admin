export interface IAccommodation {
  description: string
  id: number
  name: string
  // key: string
  // code: null
  // payment_type: null
  // pax_restriction: null
  // beds_number: null
  // is_shared: null
}

export interface IGetAccommodationsParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
