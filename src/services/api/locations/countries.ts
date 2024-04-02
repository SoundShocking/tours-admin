import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetLocationsCountriesParams,
  ILocationCountry,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createLocationsCountry = (form: any) => {
  return instance.post<ICreateResourceResponse>('/locations', form)
}

export const getLocationsCountries = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetLocationsCountriesParams = {
    by: null,
    order: null,
    page,
    'per-page': perPage,
    search: null,
    type: 'country',
  }

  if (search) {
    params.search = search
  }
  if (order) {
    params.order = order
  }
  if (by) {
    params.by = by
  }

  return instance.get<IResponseWithPagination<ILocationCountry[]>>('/locations', {
    params,
  })
}

export const getLocationsCountry = (id: number) => {
  return instance.get<IResponseWithData<ILocationCountry>>(`/locations/${id}`)
}

export const updateLocationsCountry = (id: number, form: any) => {
  return instance.put(`/locations/${id}`, form)
}

export const deleteLocationsCountry = (id: number) => {
  return instance.delete(`/locations/${id}`)
}
