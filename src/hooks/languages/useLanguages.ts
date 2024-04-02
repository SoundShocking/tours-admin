import { getLanguages } from '@/services/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useLanguages = () => {
  const { data: languages, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: () => getLanguages(),
    queryKey: ['languages'],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { isFetching, languages }
}
