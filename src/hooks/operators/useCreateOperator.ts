import { createOperator } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateOperator = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createOperatorMutate } = useMutation({
    mutationFn: (form: any) => createOperator(form),
    mutationKey: ['create-operator'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['operators'] })
    },
  })

  return { createOperatorMutate, isCreating }
}
