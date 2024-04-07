import { deleteGuide } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteGuide = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteGuideMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteGuide(id),
    mutationKey: ['delete-guide'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['guides'] })
    },
  })

  return { deleteGuideMutateAsync, isDeleting }
}
