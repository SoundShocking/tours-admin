import { createLocationsState } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateLocationsState = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createStateMutation } = useMutation({
    mutationFn: (form: any) => createLocationsState(form),
    mutationKey: ['create-tour-state'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['locations-states'] })
    },
  })

  return { createStateMutation, isCreating }
}
