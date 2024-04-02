import { deleteCurrency } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCurrency = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteCurrencyMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteCurrency(id),
    mutationKey: ['delete-currency'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['currencies'] })
    },
  })

  return { deleteCurrencyMutateAsync, isDeleting }
}
