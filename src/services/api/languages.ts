import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  ILanguage,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createLanguage = (form: any) => {
  return instance.post<ICreateResourceResponse>('/languages', form)
}

export const getLanguages = () => {
  return instance.get<IResponseWithPagination<ILanguage[]>>('/languages', {
    params: {
      'per-page': 'all',
    },
  })
}

export const getLanguage = (id: number) => {
  return instance.get<IResponseWithData<ILanguage>>(`/languages/${id}`)
}

export const updateLanguage = (id: number, form: any) => {
  return instance.put(`/languages/${id}`, form)
}

export const deleteLanguage = (id: number) => {
  return instance.delete(`/languages/${id}`)
}
