import { getCountry } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export const useCountry = (id: string) => {
  const { data: country, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getCountry(+id),
    queryKey: ['country', { id }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { country, isFetching }
}
