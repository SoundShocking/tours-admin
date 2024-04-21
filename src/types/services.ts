export interface IService {
  id: number
  key: string
  name: string
}

export interface IGetServicesParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
