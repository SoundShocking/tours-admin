export interface IGuide {
  api_id: null | number
  code: string
  id: number
  name: string
}

export interface GetGuidesParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
