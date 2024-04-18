export * from './media'
export * from './me'
export * from './countries'
export * from './languages'
export * from './foods'
export * from './accommodation-types'
export * from './statuses'
export * from './groups'
export * from './types'
export * from './seo'
export * from './currencies'
export * from './operators'
export * from './posts'
export * from './promotions'
export * from './accommodations'
export * from './mandatories'
export * from './locations'
export * from './tours'
export * from './guides'
export * from './person-guides'

export interface IResponseWithData<T> {
  data: T
}

export interface IResponseWithPagination<T> {
  data: T
  links: {
    first: string
    last: string
    next: null | string
    prev: null | string
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: {
      active: boolean
      label: string
      url: null | string
    }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

export interface ICreateResourceResponse {
  id: number
  message_key: string
}
