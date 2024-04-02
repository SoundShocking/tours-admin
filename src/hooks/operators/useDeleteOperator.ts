import { deleteOperator } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteOperator = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteOperatorMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteOperator(id),
    mutationKey: ['delete-operator'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['operators'] })
    },
  })

  return { deleteOperatorMutateAsync, isDeleting }
}
