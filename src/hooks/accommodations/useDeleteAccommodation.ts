import { deleteAccommodation } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteAccommodation = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteAccommodationMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteAccommodation(id),
    mutationKey: ['delete-accommodation'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['accommodations'] })
    },
  })

  return { deleteAccommodationMutateAsync, isDeleting }
}
