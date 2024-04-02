import { createType } from '@/services/api/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateType = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createTypeMutate } = useMutation({
    mutationFn: (form: any) => createType(form),
    mutationKey: ['create-type'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['types'] })
    },
  })

  return { createTypeMutate, isCreating }
}
