import instance from '@/services/api/instance'
import {
  ICreateResourceResponse,
  ICurrency,
  IGetCurrenciesParams,
  IResponseWithData,
  IResponseWithPagination,
} from '@/types'

export const createCurrency = (form: any) => {
  return instance.post<ICreateResourceResponse>('/currencies', form)
}

export const getCurrencies = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const params: IGetCurrenciesParams = {
    by,
    order,
    page,
    'per-page': perPage,
    search: null,
  }

  if (search) {
    params.search = search
  }

  return instance.get<IResponseWithPagination<ICurrency[]>>('/currencies', {
    params,
  })
}

export const getCurrency = (id: number) => {
  return instance.get<IResponseWithData<ICurrency>>(`/currencies/${id}`)
}

export const updateCurrency = (id: number, form: any) => {
  return instance.put(`/currencies/${id}`, form)
}

export const deleteCurrency = (id: number) => {
  return instance.delete(`/currencies/${id}`)
}
