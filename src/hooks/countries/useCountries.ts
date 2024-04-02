import { getCountries } from '@/services/api'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useCountries = () => {
  const { data: countries, isFetching } = useQuery({
    gcTime: 120_000,
    placeholderData: keepPreviousData,
    queryFn: getCountries,
    queryKey: ['countries'],
    select: response => response.data,
    staleTime: 120_000,
  })

  return { countries, isFetching }
}
