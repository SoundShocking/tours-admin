import { createLocationsCity } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateLocationsCity = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createCityMutate } = useMutation({
    mutationFn: (form: any) => createLocationsCity(form),
    mutationKey: ['create-tour-city'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-cities'] })
    },
  })

  return { createCityMutate, isCreating }
}
