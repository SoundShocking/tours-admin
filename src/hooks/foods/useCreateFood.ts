import { createFood } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateFood = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createFoodMutate } = useMutation({
    mutationFn: (form: any) => createFood(form),
    mutationKey: ['create-food'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['foods'] })
    },
  })

  return { createFoodMutate, isCreating }
}
