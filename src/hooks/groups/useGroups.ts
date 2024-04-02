import { getGroups } from '@/services/api/groups'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useGroups = (
  page: number,
  perPage: number | string,
  search: string,
  order: null | string,
  by: null | string
) => {
  const { contentLanguage } = useSettingsStore()

  const { data: groups, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getGroups(page, perPage, search, order, by),
    queryKey: ['groups', { by, lang: contentLanguage, order, page, perPage, search }],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { groups, isFetching }
}
