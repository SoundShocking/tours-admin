import { createService } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateService = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createServiceMutate } = useMutation({
    mutationFn: (form: any) => createService(form),
    mutationKey: ['create-service'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['services'] })
    },
  })

  return { createServiceMutate, isCreating }
}
