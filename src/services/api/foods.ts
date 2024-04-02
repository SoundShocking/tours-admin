import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IFood,
  IGetFoodsParams,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createFood = (form: any) => {
  return instance.post<ICreateResourceResponse>('/foods', form)
}

export const getFoods = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetFoodsParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IFood[]>>('/foods', {
    params,
  })
}

export const getFood = (id: number) => {
  return instance.get<IResponseWithData<IFood>>(`/foods/${id}`)
}

export const updateFood = (id: number, form: any) => {
  return instance.put(`/foods/${id}`, form)
}

export const deleteFood = (id: number) => {
  return instance.delete(`/foods/${id}`)
}
