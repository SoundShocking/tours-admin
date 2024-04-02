import { useCSRF } from '@/hooks/useCSRF'
import { getMe } from '@/services/api/auth'
import { useQuery } from '@tanstack/react-query'

export const useMe = () => {
  const { csrf } = useCSRF()

  const {
    data: me,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useQuery({
    enabled: !!csrf,
    gcTime: 60 * 60 * 1000,
    queryFn: getMe,
    queryKey: ['me'],
    staleTime: 60 * 60 * 1000,
  })

  return { isError, isFetching, isLoading, isSuccess, me }
}
