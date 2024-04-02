import { createLocationsCountry } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateLocationsCountry = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createCountryMutate } = useMutation({
    mutationFn: (form: any) => createLocationsCountry(form),
    mutationKey: ['create-locations-country'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-countries'] })
    },
  })

  return { createCountryMutate, isCreating }
}
