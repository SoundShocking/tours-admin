import instance from '@/services/api/instance'
import { IResponseWithPagination, ITour } from '@/types'

export const getTours = (
  page: number,
  perPage: number,
  search: string,
  order: null | string,
  by: null | string,
  status: null | string
) => {
  const params = {
    by,
    order,
    page,
    'per-page': perPage,
    publish_status: status,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<ITour[]>>('/tours', {
    params,
  })
}

export const getToursInfinite = (page: number, perPage: number, search: string) => {
  const params = {
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<ITour[]>>('/tours', {
    params,
  })
}
