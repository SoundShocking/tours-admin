import { updateAccommodationType } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateAccommodationType = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateAccommodationTypeMutate } = useMutation({
    mutationFn: (form: any) => updateAccommodationType(+id, form),
    mutationKey: ['delete-accommodation-type'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['accommodation-type'] })
      client.invalidateQueries({ queryKey: ['accommodation-types'] })
    },
  })

  return { isUpdating, updateAccommodationTypeMutate }
}
