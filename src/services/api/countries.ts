import instance from '@/services/api/instance'
import { ICountry, ICreateResourceResponse, IResponseWithData } from '@/types'

export const createCountry = (form: any) => {
  return instance.post<ICreateResourceResponse>('/countries', form)
}

export const getCountries = () => {
  return instance.get<IResponseWithData<ICountry[]>>('/countries', {
    params: {
      'per-page': 'all',
    },
  })
}
export const getCountry = (id: number) => {
  return instance.get<IResponseWithData<ICountry>>(`/countries/${id}`)
}

export const updateCountry = (id: number, form: any) => {
  return instance.put(`/countries/${id}`, form)
}

export const deleteCountry = (id: number) => {
  return instance.delete(`/countries/${id}`)
}
