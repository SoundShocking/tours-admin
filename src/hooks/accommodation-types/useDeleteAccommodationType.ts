import { deleteAccommodationType } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteAccommodationType = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteAccommodationTypeMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteAccommodationType(id),
    mutationKey: ['delete-accommodation-type'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['accommodation-types'] })
    },
  })

  return { deleteAccommodationTypeMutateAsync, isDeleting }
}
