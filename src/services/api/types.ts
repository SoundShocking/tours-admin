import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetTypesParams,
  IResponseWithData,
  IResponseWithPagination,
  IType,
} from '@/types'

export const createType = (form: any) => {
  return instance.post<ICreateResourceResponse>('/types', form)
}

export const getTypes = (
  page: number,
  perPage: number,
  search: string,
  order: null | string,
  by: null | string,
  groupId: null | number
) => {
  const params: IGetTypesParams = {
    by,
    group_id: groupId,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IType[]>>('/types', {
    params,
  })
}

export const getType = (id: number) => {
  return instance.get<IResponseWithData<IType>>(`/types/${id}`)
}

export const updateType = (id: number, form: any) => {
  return instance.put(`/types/${id}`, form)
}

export const deleteType = (id: number) => {
  return instance.delete(`/types/${id}`)
}
