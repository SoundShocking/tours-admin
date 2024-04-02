import { updateLanguage } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateLanguage = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateLanguageMutate } = useMutation({
    mutationFn: (form: any) => updateLanguage(+id, form),
    mutationKey: ['update-language'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['language'] })
      client.invalidateQueries({ queryKey: ['languages'] })
    },
  })

  return { isUpdating, updateLanguageMutate }
}
