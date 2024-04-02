import { createGroup } from '@/services/api/groups'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateGroup = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createGroupMutate } = useMutation({
    mutationFn: (form: any) => createGroup(form),
    mutationKey: ['create-group'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['groups'] })
    },
  })

  return { createGroupMutate, isCreating }
}
