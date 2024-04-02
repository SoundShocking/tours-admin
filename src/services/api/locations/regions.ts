import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetLocationsRegionsParams,
  ILocationRegion,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createLocationsRegion = (form: any) => {
  return instance.post<ICreateResourceResponse>('/locations', form)
}

export const getLocationsRegions = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string,
  country: null | number
) => {
  const params: IGetLocationsRegionsParams = {
    by,
    order,
    page,
    parent: country,
    'per-page': perPage,
    search: null,
    type: 'region',
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<ILocationRegion[]>>('/locations', {
    params,
  })
}

export const getLocationsRegion = (id: number) => {
  return instance.get<IResponseWithData<ILocationRegion>>(`/locations/${id}`)
}

export const updateLocationsRegion = (id: number, form: any) => {
  return instance.put(`/locations/${id}`, form)
}

export const deleteLocationsRegion = (id: number) => {
  return instance.delete(`/locations/${id}`)
}
