import { ISEO } from '@/types'

export interface ILocationContinent {
  api_id: null | number
  bottom_content: string
  content: string
  id: number
  in_search: number
  key: string
  latitude: string
  longitude: string
  name: string
  seo?: ISEO | null
  slug: string
  type: 'continent'
}
