import { updateGuide } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateGuide = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateGuideMutate } = useMutation({
    mutationFn: (form: any) => updateGuide(+id, form),
    mutationKey: ['update-guide'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['guide'] })
      client.invalidateQueries({ queryKey: ['guides'] })
    },
  })

  return { isUpdating, updateGuideMutate }
}
