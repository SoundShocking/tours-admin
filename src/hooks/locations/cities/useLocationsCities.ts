import { getLocationsCities } from '@/services/api'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useLocationsCities = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string,
  country: null | number
) => {
  const { contentLanguage } = useSettingsStore()

  const { data: cities, isFetching } = useQuery({
    enabled: perPage === 'all' ? !!country : true,
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getLocationsCities(page, perPage, search, order, by, country),
    queryKey: [
      'locations-cities',
      {
        by,
        country,
        lang: contentLanguage,
        order,
        page,
        perPage,
        search,
      },
    ],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { cities, isFetching }
}
