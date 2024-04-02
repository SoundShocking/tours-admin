import { deleteFile } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteFile = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteFileMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteFile(id),
    mutationKey: ['delete-file'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['media'] })
    },
  })

  return { deleteFileMutateAsync, isDeleting }
}
