import { createPersonGuide } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreatePersonGuide = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createPersonGuideMutate } = useMutation({
    mutationFn: (form: any) => createPersonGuide(form),
    mutationKey: ['create-person-guide'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['person-guides'] })
    },
  })

  return { createPersonGuideMutate, isCreating }
}
