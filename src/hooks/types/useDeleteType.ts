import { deleteType } from '@/services/api/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteType = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteTypeMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteType(id),
    mutationKey: ['delete-type'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['types'] })
    },
  })

  return { deleteTypeMutateAsync, isDeleting }
}
