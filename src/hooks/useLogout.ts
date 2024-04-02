import instance from '@/services/api/instance'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLogout = () => {
  const client = useQueryClient()

  const { isPending: isLogoutPending, mutate: logoutMutate } = useMutation({
    mutationFn: () => {
      return instance.delete('/logout')
    },
    mutationKey: ['logout'],
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['csrf'] })
      client.invalidateQueries({ queryKey: ['me'] })
    },
  })

  return { isLogoutPending, logoutMutate }
}
