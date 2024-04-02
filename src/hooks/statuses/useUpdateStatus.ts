import { updateStatus } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateStatus = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateStatusMutate } = useMutation({
    mutationFn: (form: any) => updateStatus(+id, form),
    mutationKey: ['update-status'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['status'] })
      client.invalidateQueries({ queryKey: ['statuses'] })
    },
  })

  return { isUpdating, updateStatusMutate }
}
