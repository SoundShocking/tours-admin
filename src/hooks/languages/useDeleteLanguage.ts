import { deleteLanguage } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteLanguage = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteLanguageMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteLanguage(id),
    mutationKey: ['delete-language'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['languages'] })
    },
  })

  return { deleteLanguageMutateAsync, isDeleting }
}
