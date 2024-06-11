import { getTours } from '@/services/api'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useTours = (
  page: number,
  perPage: number,
  search: string,
  order: null | string,
  by: null | string,
  status: null | string
) => {
  const { contentLanguage } = useSettingsStore()

  const { data: tours, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getTours(page, perPage, search, order, by, status),
    queryKey: ['tours', { by, lang: contentLanguage, order, page, perPage, search, status }],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { isFetching, tours }
}
