import { createStatus } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateStatus = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createStatusMutate } = useMutation({
    mutationFn: (form: any) => createStatus(form),
    mutationKey: ['update-status'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['statuses'] })
    },
  })

  return { createStatusMutate, isCreating }
}
