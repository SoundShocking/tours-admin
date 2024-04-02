import { IGroup } from '@/types/groups'
import { IMediaFile } from '@/types/media'
import { ISEO } from '@/types/seo'

export interface IType {
  bottom_content: string
  code: string
  content: string
  group: IGroup | null
  id: number
  seo: ISEO | null
  slug: string
  thumb: IMediaFile | null
  type: string
  type_id: string
  type_name: string
}

export interface IGetTypesParams {
  by: null | string
  group_id: null | number
  order: null | string
  page: number
  'per-page': number
  search: null | string
}
