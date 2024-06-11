import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetToursInfiniteParams,
  IGetToursParams,
  IResponseWithData,
  IResponseWithPagination,
  ITour,
  ITourDetailed,
} from '@/types'

export const createTour = (form: any) => {
  return instance.post<ICreateResourceResponse>('/tours', form)
}

export const getTours = (
  page: number,
  perPage: number,
  search: string,
  order: null | string,
  by: null | string,
  status: null | string
) => {
  const params: IGetToursParams = {
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
  const params: IGetToursInfiniteParams = {
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

export const getTour = (id: number) => {
  return instance.get<IResponseWithData<ITourDetailed>>(`/tours/${id}`)
}

export const updateTour = (id: number, form: any) => {
  return instance.put(`/tours/${id}`, form)
}

export const deleteTour = (id: number) => {
  return instance.delete(`/tours/${id}`)
}
