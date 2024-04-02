import { createMandatory } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateMandatory = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createMandatoryMutate } = useMutation({
    mutationFn: (form: any) => createMandatory(form),
    mutationKey: ['create-mandatory'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['mandatories'] })
    },
  })

  return { createMandatoryMutate, isCreating }
}
