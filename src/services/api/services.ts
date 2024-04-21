import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetServicesParams,
  IResponseWithData,
  IResponseWithPagination,
  IService,
} from '@/types'

export const createService = (form: any) => {
  return instance.post<ICreateResourceResponse>('/services', form)
}

export const getServices = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetServicesParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IService[]>>('/services', {
    params,
  })
}

export const getService = (id: number) => {
  return instance.get<IResponseWithData<IService>>(`/services/${id}`)
}

export const updateService = (id: number, form: any) => {
  return instance.put(`/services/${id}`, form)
}

export const deleteService = (id: number) => {
  return instance.delete(`/services/${id}`)
}
