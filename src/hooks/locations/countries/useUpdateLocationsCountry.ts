import { updateLocationsCountry } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateLocationsCountry = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateCountryMutate } = useMutation({
    mutationFn: (form: any) => updateLocationsCountry(+id, form),
    mutationKey: ['update-tour-country'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-country'] })
      client.invalidateQueries({ queryKey: ['locations-countries'] })
    },
  })

  return { isUpdating, updateCountryMutate }
}
