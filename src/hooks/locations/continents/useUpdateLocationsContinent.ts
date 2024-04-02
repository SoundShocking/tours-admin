import { updateLocationsContinent } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateLocationsContinent = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateTourContinentMutate } = useMutation({
    mutationFn: (form: any) => updateLocationsContinent(+id, form),
    mutationKey: ['update-continent'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-continent'] })
      client.invalidateQueries({ queryKey: ['locations-continents'] })
    },
  })

  return { isUpdating, updateTourContinentMutate }
}
