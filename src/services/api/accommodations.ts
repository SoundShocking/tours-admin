import instance from '@/services/api/instance'
import {
  IAccommodation,
  ICreateResourceResponse,
  IGetAccommodationsParams,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createAccommodation = (form: any) => {
  return instance.post<ICreateResourceResponse>('/accommodations', form)
}

export const getAccommodations = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetAccommodationsParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IAccommodation[]>>('/accommodations', {
    params,
  })
}

export const getAccommodation = (id: number) => {
  return instance.get<IResponseWithData<IAccommodation>>(`/accommodations/${id}`)
}

export const updateAccommodation = (id: number, form: any) => {
  return instance.put(`/accommodations/${id}`, form)
}

export const deleteAccommodation = (id: number) => {
  return instance.delete(`/accommodations/${id}`)
}
