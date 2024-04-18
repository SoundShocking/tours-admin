import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetPersonGuidesParams,
  IPersonGuide,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createPersonGuide = (form: any) => {
  return instance.post<ICreateResourceResponse>('/person-guides', form)
}

export const getPersonGuides = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetPersonGuidesParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IPersonGuide[]>>('/person-guides', {
    params,
  })
}

export const getPersonGuide = (id: number) => {
  return instance.get<IResponseWithData<IPersonGuide>>(`/person-guides/${id}`)
}

export const updatePersonGuide = (id: number, form: any) => {
  return instance.put(`/person-guides/${id}`, form)
}

export const deletePersonGuide = (id: number) => {
  return instance.delete(`/person-guides/${id}`)
}
