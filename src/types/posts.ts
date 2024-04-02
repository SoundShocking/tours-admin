import { IMediaFile } from '@/types/media'
import { ISEO } from '@/types/seo'
import { ITour } from '@/types/tours'

export interface IPost {
  content: IContentBuilderType
  created: string
  deleted: null | string
  id: number
  name: string
  post_metas: IPostMetaRelatedTours[]
  seo?: ISEO
  slug: string
  thumb: IMediaFile
  type: PostRecordType
  updated: string
  url: string
}

export interface IGetPostsParams {
  page: number
  'per-page': number | string
  search: null | string
  trash: boolean | null
  type: null | string
}

export enum PostRecordType {
  ARTICLE = 'articles',
  NEWS = 'news',
}

export enum ContentBuilderBlock {
  FAQ = 'faq',
  IMAGE = 'image',
  WYSIWYG = 'wysiwyg',
}

interface IPostContentText {
  content: {
    wysiwyg: string
  }
  type: ContentBuilderBlock.WYSIWYG
}

export interface IPostContentImage {
  content: {
    image: IMediaFile | null
  }
  type: ContentBuilderBlock.IMAGE
}

export interface IQuestionAnswer {
  answer: string
  question: string
}

interface IPostContentFAQ {
  content: IQuestionAnswer[]
  type: ContentBuilderBlock.FAQ
}

export type IContentBuilderType = (IPostContentFAQ | IPostContentImage | IPostContentText)[]

interface IBasePostMeta {
  id: number
  text: string
}

export interface IPostMetaRelatedTours extends IBasePostMeta {
  tours: ITour[]
  type: 'related_tours'
}

// export interface PostMetaRelatedCruises extends BasePostMeta {
//   type: 'related_cruises'
//   cruises: Cruise[]
// }
