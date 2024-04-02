import { updateLocationsState } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateLocationsState = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateStateMutate } = useMutation({
    mutationFn: (form: any) => updateLocationsState(+id, form),
    mutationKey: ['update-locations-state'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-state'] })
      client.invalidateQueries({ queryKey: ['locations-states'] })
    },
  })

  return { isUpdating, updateStateMutate }
}
