import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetMandatoriesParams,
  IMandatory,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createMandatory = (form: any) => {
  return instance.post<ICreateResourceResponse>('/mandatories', form)
}

export const getMandatories = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetMandatoriesParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IMandatory[]>>('/mandatories', {
    params,
  })
}

export const getMandatory = (id: number) => {
  return instance.get<IResponseWithData<IMandatory>>(`/mandatories/${id}`)
}

export const updateMandatory = (id: number, form: any) => {
  return instance.put(`/mandatories/${id}`, form)
}

export const deleteMandatory = (id: number) => {
  return instance.delete(`/mandatories/${id}`)
}
