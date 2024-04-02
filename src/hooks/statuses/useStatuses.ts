import { getStatuses } from '@/services/api'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useStatuses = (page: number, perPage: number | string, search: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: statuses, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getStatuses(page, perPage, search),
    queryKey: ['statuses', { lang: contentLanguage, page, perPage, search }],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { isFetching, statuses }
}
