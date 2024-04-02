import { deletePromotion } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeletePromotion = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutate: deletePromotionMutate } = useMutation({
    mutationFn: (id: number) => deletePromotion(id),
    mutationKey: ['delete-promotion'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['promotions'] })
    },
  })

  return { deletePromotionMutate, isDeleting }
}
