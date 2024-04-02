import { updateCurrency } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateCurrency = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateCurrencyMutate } = useMutation({
    mutationFn: (form: any) => updateCurrency(+id, form),
    mutationKey: ['update-currency'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['currency'] })
      client.invalidateQueries({ queryKey: ['currencies'] })
    },
  })

  return { isUpdating, updateCurrencyMutate }
}
