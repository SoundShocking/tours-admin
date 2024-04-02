import { updatePromotion } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdatePromotion = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updatePromotionMutate } = useMutation({
    mutationFn: (form: any) => updatePromotion(+id, form),
    mutationKey: ['update-promotion'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['promotion'] })
      client.invalidateQueries({ queryKey: ['promotions'] })
    },
  })

  return { isUpdating, updatePromotionMutate }
}
