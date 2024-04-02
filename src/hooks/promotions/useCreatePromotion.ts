import { createPromotion } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreatePromotion = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createPromotionMutate } = useMutation({
    mutationFn: (form: any) => createPromotion(form),
    mutationKey: ['create-promotion'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['promotions'] })
    },
  })

  return { createPromotionMutate, isCreating }
}
