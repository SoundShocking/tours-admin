import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetGroupsParams,
  IGroup,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createGroup = (form: any) => {
  return instance.post<ICreateResourceResponse>('/groups', form)
}

export const getGroups = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetGroupsParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IGroup[]>>('/groups', {
    params,
  })
}

export const getGroup = (id: number) => {
  return instance.get<IResponseWithData<IGroup>>(`/groups/${id}`)
}

export const updateGroup = (id: number, form: any) => {
  return instance.put(`/groups/${id}`, form)
}

export const deleteGroup = (id: number) => {
  return instance.delete(`/groups/${id}`)
}
