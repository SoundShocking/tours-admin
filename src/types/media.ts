interface IMediaSizes {
  '300x300': string
  '1024x1024': string
}

export interface IMediaFile {
  alt: string
  created: string
  dimensions: null | string
  extension: string
  filename: string
  filesize: string
  id: number
  mime_type: string
  original_name: string
  preview: string
  sizes: IMediaSizes | null
  title: string
  updated: string
  url: string
}

export interface IGetMediaParams {
  page: number
  'per-page': number
  search: null | string
}
