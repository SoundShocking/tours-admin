import { createCurrency } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCurrency = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createCurrencyMutate } = useMutation({
    mutationFn: (form: any) => createCurrency(form),
    mutationKey: ['create-currency'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['currencies'] })
    },
  })

  return { createCurrencyMutate, isCreating }
}
