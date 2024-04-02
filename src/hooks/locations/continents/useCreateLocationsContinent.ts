import { createLocationsContinent } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateLocationsContinent = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createTourContinentMutate } = useMutation({
    mutationFn: (form: any) => createLocationsContinent(form),
    mutationKey: ['create-locations-continent'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-continents'] })
    },
  })

  return { createTourContinentMutate, isCreating }
}
