import { updateCountry } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateCountry = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateCountryMutate } = useMutation({
    mutationFn: (form: any) => updateCountry(+id, form),
    mutationKey: ['update-country'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['country'] })
      client.invalidateQueries({ queryKey: ['countries'] })
    },
  })

  return { isUpdating, updateCountryMutate }
}
