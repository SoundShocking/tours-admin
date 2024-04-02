import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetOperatorsParams,
  IOperator,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createOperator = (form: any) => {
  return instance.post<ICreateResourceResponse>('/operators', form)
}

export const getOperators = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetOperatorsParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IOperator[]>>('/operators', {
    params,
  })
}

export const getOperator = (id: number) => {
  return instance.get<IResponseWithData<IOperator>>(`/operators/${id}`)
}

export const updateOperator = (id: number, form: any) => {
  return instance.put(`/operators/${id}`, form)
}

export const deleteOperator = (id: number) => {
  return instance.delete(`/operators/${id}`)
}
