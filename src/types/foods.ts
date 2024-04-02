export interface IFood {
  id: number
  name: string
  type: string
}

export interface IGetFoodsParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
