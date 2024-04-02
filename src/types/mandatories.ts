export interface IMandatory {
  description: string
  id: number
  key: string
  name: string
}

export interface IGetMandatoriesParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
