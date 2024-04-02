import { getToursInfinite } from '@/services/api'
import { useSettingsStore } from '@/store'
import { IResponseWithPagination, ITour } from '@/types'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useToursInfinite = () => {
  const { contentLanguage } = useSettingsStore()

  const {
    data: tours,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<
    AxiosResponse<IResponseWithPagination<ITour[]>>,
    unknown,
    InfiniteData<AxiosResponse<IResponseWithPagination<ITour[]>>>,
    any,
    number
  >({
    getNextPageParam: lastPage => {
      return lastPage.data.meta.current_page < lastPage.data.meta.last_page
        ? lastPage.data.meta.current_page + 1
        : null
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getToursInfinite(pageParam, 8, ''),
    queryKey: ['tours-infinite', { lang: contentLanguage, search: '' }],
  })

  return { fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, tours }
}
