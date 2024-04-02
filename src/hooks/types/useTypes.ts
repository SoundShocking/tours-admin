import { getTypes } from '@/services/api/types'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useTypes = (
  page: number,
  perPage: number,
  search: string,
  order: null | string,
  by: null | string,
  groupId: null | number = null
) => {
  const { contentLanguage } = useSettingsStore()

  const { data: types, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getTypes(page, perPage, search, order, by, groupId),
    queryKey: ['types', { by, groupId, lang: contentLanguage, order, page, perPage, search }],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { isFetching, types }
}
