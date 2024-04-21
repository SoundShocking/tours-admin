import { deleteService } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteService = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteServiceMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteService(id),
    mutationKey: ['delete-service'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['services'] })
    },
  })

  return { deleteServiceMutateAsync, isDeleting }
}
