import { IMediaFile } from '@/types/media'

export interface ISEO {
  description: string
  id: number
  key_words: string
  media: IMediaFile | null
  title: string
}
