import { deleteLocationsCity } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteLocationsCity = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteTourCityMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteLocationsCity(id),
    mutationKey: ['delete-tour-city'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-cities'] })
    },
  })

  return { deleteTourCityMutateAsync, isDeleting }
}
