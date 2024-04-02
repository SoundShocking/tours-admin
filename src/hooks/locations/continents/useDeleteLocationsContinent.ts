import { deleteLocationsContinent } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteLocationsContinent = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteTourContinentMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteLocationsContinent(id),
    mutationKey: ['delete-continent'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-continents'] })
    },
  })

  return { deleteTourContinentMutateAsync, isDeleting }
}
