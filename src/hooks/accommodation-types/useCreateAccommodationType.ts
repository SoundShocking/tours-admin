import { createAccommodationType } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateAccommodationType = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createAccommodationTypeMutate } = useMutation({
    mutationFn: (form: any) => createAccommodationType(form),
    mutationKey: ['create-accommodation-type'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['accommodation-types'] })
    },
  })

  return { createAccommodationTypeMutate, isCreating }
}
