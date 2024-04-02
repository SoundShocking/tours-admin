import { updateType } from '@/services/api/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateType = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateTypeMutate } = useMutation({
    mutationFn: (form: any) => updateType(+id, form),
    mutationKey: ['update-type'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['type'] })
      client.invalidateQueries({ queryKey: ['types'] })
    },
  })

  return { isUpdating, updateTypeMutate }
}
