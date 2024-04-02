import { deleteLocationsCountry } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteLocationsCountry = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteCountryMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteLocationsCountry(id),
    mutationKey: ['delete-country'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-countries'] })
    },
  })

  return { deleteCountryMutateAsync, isDeleting }
}
