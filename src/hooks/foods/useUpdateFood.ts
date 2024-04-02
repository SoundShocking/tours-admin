import { updateFood } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateFood = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateFoodMutate } = useMutation({
    mutationFn: (form: any) => updateFood(+id, form),
    mutationKey: ['update-food'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['food'] })
      client.invalidateQueries({ queryKey: ['foods'] })
    },
  })

  return { isUpdating, updateFoodMutate }
}
