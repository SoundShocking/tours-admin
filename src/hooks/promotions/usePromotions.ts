import { getPromotions } from '@/services/api'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const usePromotions = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const { contentLanguage } = useSettingsStore()

  const { data: promotions, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getPromotions(page, perPage, search, order, by),
    queryKey: ['promotions', { by, lang: contentLanguage, order, page, perPage, search }],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { isFetching, promotions }
}
