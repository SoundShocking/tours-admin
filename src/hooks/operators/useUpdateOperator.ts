import { updateOperator } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateOperator = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateOperatorMutate } = useMutation({
    mutationFn: (form: any) => updateOperator(+id, form),
    mutationKey: ['update-operator'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['operator'] })
      client.invalidateQueries({ queryKey: ['operators'] })
    },
  })

  return { isUpdating, updateOperatorMutate }
}
