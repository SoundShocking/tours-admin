export interface IPersonGuide {
  created: string
  id: number
  languages: []
  name: string
  updated: string
}

export interface IGetPersonGuidesParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
