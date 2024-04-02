import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetLocationsCitiesParams,
  ILocationCity,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createLocationsCity = (form: any) => {
  return instance.post<ICreateResourceResponse>('/locations', form)
}

export const getLocationsCities = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string,
  country: null | number
) => {
  const params: IGetLocationsCitiesParams = {
    by,
    country_id: country,
    order,
    page,
    'per-page': perPage,
    search: null,
    type: 'city',
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<ILocationCity[]>>(`/locations`, {
    params,
  })
}

export const getLocationsCity = (id: number) => {
  return instance.get<IResponseWithData<ILocationCity>>(`/locations/${id}`)
}

export const updateLocationsCity = (id: number, form: any) => {
  return instance.put(`/locations/${id}`, form)
}

export const deleteLocationsCity = (id: number) => {
  return instance.delete(`/locations/${id}`)
}
