import { getLocationsContinents } from '@/services/api'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useLocationsContinents = (order: null | string, by: null | string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: continents, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getLocationsContinents(order, by),
    queryKey: ['locations-continents', { by, lang: contentLanguage, order }],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { continents, isFetching }
}
