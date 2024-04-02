import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetStatusesParams,
  IResponseWithData,
  IResponseWithPagination,
  IStatus,
} from '@/types'

export const createStatus = (form: any) => {
  return instance.post<ICreateResourceResponse>('/statuses', form)
}

export const getStatuses = (page: number, perPage: number | string, search: string) => {
  const params: IGetStatusesParams = {
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IStatus[]>>('/statuses', {
    params,
  })
}

export const getStatus = (id: number) => {
  return instance.get<IResponseWithData<IStatus>>(`/statuses/${id}`)
}

export const updateStatus = (id: number, form: any) => {
  return instance.put(`/statuses/${id}`, form)
}

export const deleteStatus = (id: number) => {
  return instance.delete(`/statuses/${id}`)
}
