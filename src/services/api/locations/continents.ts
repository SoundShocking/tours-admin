import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  ILocationContinent,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createLocationsContinent = (form: any) => {
  return instance.post<ICreateResourceResponse>('/locations', form)
}

export const getLocationsContinents = (order: null | string, by: null | string) => {
  return instance.get<IResponseWithPagination<ILocationContinent[]>>('/locations', {
    params: {
      by,
      order,
      'per-page': 'all',
      type: 'continent',
    },
  })
}

export const getLocationsContinent = (id: number) => {
  return instance.get<IResponseWithData<ILocationContinent>>(`/locations/${id}`)
}

export const updateLocationsContinent = (id: number, form: any) => {
  return instance.put(`/locations/${id}`, form)
}

export const deleteLocationsContinent = (id: number) => {
  return instance.delete(`/locations/${id}`)
}
