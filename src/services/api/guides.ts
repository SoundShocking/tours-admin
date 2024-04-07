import instance from '@/services/api/instance'
import {
  GetGuidesParams,
  ICreateResourceResponse,
  IGuide,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createGuide = (form: any) => {
  return instance.post<ICreateResourceResponse>('/guides', form)
}

export const getGuides = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: GetGuidesParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IGuide[]>>('/guides', {
    params,
  })
}

export const getGuide = (id: number) => {
  return instance.get<IResponseWithData<IGuide>>(`/guides/${id}`)
}

export const updateGuide = (id: number, form: any) => {
  return instance.put(`/guides/${id}`, form)
}

export const deleteGuide = (id: number) => {
  return instance.delete(`/guides/${id}`)
}
