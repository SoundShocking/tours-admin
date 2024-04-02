import { authorize } from '@/services/api/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAuthorize = () => {
  const client = useQueryClient()

  const { isPending, mutate: authorizeMutate } = useMutation({
    mutationFn: authorize,
    mutationKey: ['authorize'],
    onSuccess: async data => {
      // setCSRF(data.data.csrf_token)
      // @ts-ignore
      client.setQueryData(['csrf'], olData => ({ ...olData, data: data.data.csrf_token }))
      await client.invalidateQueries({ queryKey: ['me'] })
    },
  })

  return { authorizeMutate, isPending }
}
