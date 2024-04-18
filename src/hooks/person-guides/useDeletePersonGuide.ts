import { deletePersonGuide } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeletePersonGuide = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deletePersonGuideMutateAsync } = useMutation({
    mutationFn: (id: number) => deletePersonGuide(id),
    mutationKey: ['delete-person-guide'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['person-guides'] })
    },
  })

  return { deletePersonGuideMutateAsync, isDeleting }
}
