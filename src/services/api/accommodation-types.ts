import instance from '@/services/api/instance'
import {
  GetAccommodationTypesParams,
  IAccommodationType,
  ICreateResourceResponse,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createAccommodationType = (form: any) => {
  return instance.post<ICreateResourceResponse>('/accommodation-types', form)
}

export const getAccommodationTypes = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: GetAccommodationTypesParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IAccommodationType[]>>('/accommodation-types', {
    params,
  })
}

export const getAccommodationType = (id: number) => {
  return instance.get<IResponseWithData<IAccommodationType>>(`/accommodation-types/${id}`)
}

export const updateAccommodationType = (id: number, form: any) => {
  return instance.put(`/accommodation-types/${id}`, form)
}

export const deleteAccommodationType = (id: number) => {
  return instance.delete<IResponseWithData<IAccommodationType>>(`/accommodation-types/${id}`)
}
