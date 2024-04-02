import { getLanguage } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export const useLanguage = (id: string) => {
  const { data: language, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getLanguage(+id),
    queryKey: ['language', { id }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, language }
}
