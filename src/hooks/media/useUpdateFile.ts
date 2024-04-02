import { updateFile } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateFile = (id: number) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateFileMutate } = useMutation({
    mutationFn: (file: any) => updateFile(id, file),
    mutationKey: ['update-file'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['media'] })
      client.invalidateQueries({ queryKey: ['media-file', { id }] })
    },
  })

  return { isUpdating, updateFileMutate }
}
