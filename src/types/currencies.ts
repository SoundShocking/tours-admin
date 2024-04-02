export interface ICurrency {
  currency_code: string
  currency_name: string
  currency_symbol: null | string
  id: number
}

export interface IGetCurrenciesParams {
  by: null | string
  order: null | string
  page: number
  'per-page': number | string
  search: null | string
}
