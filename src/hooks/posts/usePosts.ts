import { getPosts } from '@/services/api'
import { useSettingsStore } from '@/store'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const usePosts = (
  page: number,
  perPage: number,
  search: string,
  recordType: null | string,
  trash: boolean
) => {
  const { contentLanguage } = useSettingsStore()

  const {
    data: posts,
    isFetching,
    isLoading,
    isSuccess,
  } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getPosts(page, perPage, search, recordType, trash),
    queryKey: ['posts', { lang: contentLanguage, page, perPage, recordType, search, trash }],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { isFetching, isLoading, isSuccess, posts }
}
