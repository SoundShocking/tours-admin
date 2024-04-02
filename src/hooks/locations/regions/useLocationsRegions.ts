import { getLocationsRegions } from '@/services/api'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useLocationsRegions = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string,
  country: null | number
) => {
  const { contentLanguage } = useSettingsStore()

  const { data: regions, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getLocationsRegions(page, perPage, search, order, by, country),
    queryKey: [
      'locations-regions',
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

  return { isFetching, regions }
}
