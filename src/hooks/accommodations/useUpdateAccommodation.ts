import { updateAccommodation } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateAccommodation = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateAccommodationMutate } = useMutation({
    mutationFn: (form: any) => updateAccommodation(+id, form),
    mutationKey: ['update-accommodation'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['accommodation'] })
      client.invalidateQueries({ queryKey: ['accommodations'] })
    },
  })

  return { isUpdating, updateAccommodationMutate }
}
