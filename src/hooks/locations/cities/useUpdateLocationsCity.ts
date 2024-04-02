import { updateLocationsCity } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateLocationsCity = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateCityMutate } = useMutation({
    mutationFn: (form: any) => updateLocationsCity(+id, form),
    mutationKey: ['update-locations-city'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-city'] })
      client.invalidateQueries({ queryKey: ['locations-cities'] })
    },
  })

  return { isUpdating, updateCityMutate }
}
