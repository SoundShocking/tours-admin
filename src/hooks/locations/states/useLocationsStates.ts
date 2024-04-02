import { getLocationsStates } from '@/services/api'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useLocationsStates = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const { contentLanguage } = useSettingsStore()

  const { data: states, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getLocationsStates(page, perPage, search, order, by),
    queryKey: ['locations-states', { by, lang: contentLanguage, order, page, perPage, search }],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { isFetching, states }
}
