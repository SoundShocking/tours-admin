import { IMediaFile } from '@/types/media'
import { ISEO } from '@/types/seo'

export interface IOperator {
  api_id: null | number
  bottom_content: string
  code: string
  content: string
  has_integration: number
  id: number
  name: string
  seo?: ISEO | null
  slug: string
  thumb: IMediaFile | null
}

export interface IGetOperatorsParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
