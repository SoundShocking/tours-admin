import { createLocationsRegion } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateLocationsRegion = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createTourRegionMutate } = useMutation({
    mutationFn: (form: any) => createLocationsRegion(form),
    mutationKey: ['create-locations-region'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-regions'] })
    },
  })

  return { createTourRegionMutate, isCreating }
}
