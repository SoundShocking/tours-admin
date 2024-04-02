import { deleteStatus } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteStatus = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteStatusMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteStatus(id),
    mutationKey: ['delete-status'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['statuses'] })
    },
  })

  return { deleteStatusMutateAsync, isDeleting }
}
