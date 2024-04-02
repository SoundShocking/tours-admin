import { updateLocationsRegion } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateLocationsRegion = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateRegionMutate } = useMutation({
    mutationFn: (form: any) => updateLocationsRegion(+id, form),
    mutationKey: ['update-locations-region'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-region'] })
      client.invalidateQueries({ queryKey: ['locations-regions'] })
    },
  })

  return { isUpdating, updateRegionMutate }
}
