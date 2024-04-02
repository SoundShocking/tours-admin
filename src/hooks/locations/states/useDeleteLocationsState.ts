import { deleteLocationsState } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteLocationsState = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteStateMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteLocationsState(id),
    mutationKey: ['delete-locations-state'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-states'] })
    },
  })

  return { deleteStateMutateAsync, isDeleting }
}
