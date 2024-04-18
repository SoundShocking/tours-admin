import { updatePersonGuide } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdatePersonGuide = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updatePersonGuideMutate } = useMutation({
    mutationFn: (form: any) => updatePersonGuide(+id, form),
    mutationKey: ['update-person-guide'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['person-guide'] })
      client.invalidateQueries({ queryKey: ['person-guides'] })
    },
  })

  return { isUpdating, updatePersonGuideMutate }
}
