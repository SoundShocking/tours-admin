import { createCountry } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCountry = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createCountryMutate } = useMutation({
    mutationFn: (form: any) => createCountry(form),
    mutationKey: ['create-country'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['countries'] })
    },
  })

  return { createCountryMutate, isCreating }
}
