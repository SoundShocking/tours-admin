import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetLocationsStateParams,
  ILocationState,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createLocationsState = (form: any) => {
  return instance.post<ICreateResourceResponse>('/locations', form)
}

export const getLocationsStates = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetLocationsStateParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
    type: 'state',
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<ILocationState[]>>('/locations', {
    params,
  })
}

export const getLocationsState = (id: number) => {
  return instance.get<IResponseWithData<ILocationState>>(`/locations/${id}`)
}

export const updateLocationsState = (id: number, form: any) => {
  return instance.put(`/locations/${id}`, form)
}

export const deleteLocationsState = (id: number) => {
  return instance.delete(`/locations/${id}`)
}
