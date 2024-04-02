import { createAccommodation } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateAccommodation = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createAccommodationMutate } = useMutation({
    mutationFn: (form: any) => createAccommodation(form),
    mutationKey: ['create-accommodation'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['accommodations'] })
    },
  })

  return { createAccommodationMutate, isCreating }
}
