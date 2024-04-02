export interface IStatus {
  departure_type: string
  id: number
  key: string
}

export interface IGetStatusesParams {
  page: number
  'per-page': number | string
  search: null | string
}
