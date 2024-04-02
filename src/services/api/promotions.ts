import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  IGetPromotionsParams,
  IPromotion,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createPromotion = (form: any) => {
  return instance.post<ICreateResourceResponse>('/promotions', form)
}

export const getPromotions = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetPromotionsParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<IPromotion[]>>('/promotions', {
    params,
  })
}

export const getPromotion = (id: number) => {
  return instance.get<IResponseWithData<IPromotion>>(`/promotions/${id}`)
}

export const updatePromotion = (id: number, form: any) => {
  return instance.put(`/promotions/${id}`, form)
}

export const deletePromotion = (id: number) => {
  return instance.delete(`/promotions/${id}`)
}
