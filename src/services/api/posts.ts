import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetPostsParams,
  IPost,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createPost = (form: any) => {
  return instance.post<ICreateResourceResponse>('/posts', form)
}

export const getPosts = (
  page: number,
  perPage: number,
  search: string,
  recordType: null | string,
  trash: boolean
) => {
  const params: IGetPostsParams = {
    page,
    'per-page': perPage,
    search: null,
    trash: null,
    type: null,
  }

  if (recordType) {
    params.type = recordType
  }

  if (search) {
    params.search = search
  }

  if (trash) {
    params.trash = true
  }

  return instance.get<IResponseWithPagination<IPost[]>>('/posts', {
    params,
  })
}

export const getPost = (id: number) => {
  return instance.get<IResponseWithData<IPost>>(`/posts/${id}`)
}

export const updatePost = (id: number, form: any) => {
  return instance.put(`/posts/${id}`, form)
}

export const deletePost = (id: number) => {
  return instance.delete(`/posts/${id}`)
}

export const restorePost = (id: number) => {
  return instance.post(`/posts/restore/${id}`)
}
