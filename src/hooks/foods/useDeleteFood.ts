import { deleteFood } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteFood = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteFoodMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteFood(id),
    mutationKey: ['delete-food'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['foods'] })
    },
  })

  return { deleteFoodMutateAsync, isDeleting }
}
