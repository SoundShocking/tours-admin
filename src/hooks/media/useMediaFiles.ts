import { getMediaFiles } from '@/services/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useMediaFiles = (page: number, perPage: number) => {
  const {
    data: media,
    isFetching,
    refetch,
  } = useQuery({
    gcTime: 0,
    placeholderData: keepPreviousData,
    queryFn: () => getMediaFiles(page, perPage, null),
    queryKey: ['media-files', { page, perPage }],
    refetchOnMount: 'always',
    select: response => response.data,
    staleTime: 0,
  })

  return { isFetching, media, refetch }
}
