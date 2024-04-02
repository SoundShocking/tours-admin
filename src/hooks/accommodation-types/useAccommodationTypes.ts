import { getAccommodationTypes } from '@/services/api'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useAccommodationTypes = (
  page: number,
  perPage: number | string,
  search: '',
  order: null | string,
  by: null | string
) => {
  const { contentLanguage } = useSettingsStore()

  const { data: accommodationTypes, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getAccommodationTypes(page, perPage, search, order, by),
    queryKey: ['accommodation-types', { by, lang: contentLanguage, order, page, perPage, search }],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { accommodationTypes, isFetching }
}
