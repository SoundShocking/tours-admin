import instance from '@/services/api/instance'
import { IGetMediaParams, IMediaFile, IResponseWithData, IResponseWithPagination } from '@/types'

export const getMediaFiles = (page: number, perPage: number, search: null | string) => {
  const params: IGetMediaParams = {
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IMediaFile[]>>('/media', {
    params,
  })
}

export const getMediaFile = (id: number) => {
  return instance.get<IResponseWithData<IMediaFile>>(`/media/${id}`)
}

export const updateFile = (id: number, form: any) => {
  return instance.put(`/media/${id}`, form)
}

export const deleteFile = (id: number) => {
  return instance.delete(`/media/${id}`)
}
