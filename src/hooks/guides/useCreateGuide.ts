import { createGuide } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateGuide = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createGuideMutate } = useMutation({
    mutationFn: (form: any) => createGuide(form),
    mutationKey: ['create-guide'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['guides'] })
    },
  })

  return { createGuideMutate, isCreating }
}
