import { IType } from '@/types/types'

export interface IGroup {
  code: string
  description: string
  filter_included: number
  group_id: string
  group_name: string
  id: number
  in_search: number
  order: null | number
  types: IType[]
}

export interface IGetGroupsParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
