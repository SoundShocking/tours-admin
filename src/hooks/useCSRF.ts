import { useEffect } from 'react'

import { setCSRF } from '@/helpers'
import instance from '@/services/api/instance'
import { useQuery } from '@tanstack/react-query'

export const useCSRF = () => {
  const {
    data: csrf,
    isFetching,
    isLoading,
  } = useQuery({
    gcTime: 60 * 60 * 1000,
    queryFn: () => {
      return instance.get('/csrf-token')
    },
    queryKey: ['csrf'],
    select: response => response.data,
    staleTime: 60 * 60 * 1000,
  })

  useEffect(() => {
    if (csrf) {
      setCSRF(csrf)
    }
  }, [csrf])

  return { csrf, isFetching, isLoading }
}
