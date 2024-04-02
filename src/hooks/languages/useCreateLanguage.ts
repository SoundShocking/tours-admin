import { createLanguage } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateLanguage = () => {
  const client = useQueryClient()

  const { isPending: isCreating, mutate: createLanguageMutate } = useMutation({
    mutationFn: (form: any) => createLanguage(form),
    mutationKey: ['create-language'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['languages'] })
    },
  })

  return { createLanguageMutate, isCreating }
}
