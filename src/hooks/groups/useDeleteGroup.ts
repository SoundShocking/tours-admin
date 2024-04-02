import { deleteGroup } from '@/services/api/groups'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteGroup = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteGroupMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteGroup(id),
    mutationKey: ['delete-group'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['groups'] })
    },
  })

  return { deleteGroupMutateAsync, isDeleting }
}
