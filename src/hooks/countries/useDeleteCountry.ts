import { deleteCountry } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCountry = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteCountryMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteCountry(id),
    mutationKey: ['delete-country'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['countries'] })
    },
  })

  return { deleteCountryMutateAsync, isDeleting }
}
