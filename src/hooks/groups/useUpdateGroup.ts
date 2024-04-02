import { updateGroup } from '@/services/api/groups'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateGroup = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateGroupMutate } = useMutation({
    mutationFn: (form: any) => updateGroup(+id, form),
    mutationKey: ['update-group'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['group'] })
      client.invalidateQueries({ queryKey: ['groups'] })
    },
  })

  return { isUpdating, updateGroupMutate }
}
