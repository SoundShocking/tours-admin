import { deleteLocationsRegion } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteLocationsRegion = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteTourRegionMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteLocationsRegion(id),
    mutationKey: ['delete-locations-region'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-regions'] })
    },
  })

  return { deleteTourRegionMutateAsync, isDeleting }
}
