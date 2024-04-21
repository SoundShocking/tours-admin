import { updateService } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateService = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateServiceMutate } = useMutation({
    mutationFn: (form: any) => updateService(+id, form),
    mutationKey: ['update-service'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['service'] })
      client.invalidateQueries({ queryKey: ['services'] })
    },
  })

  return { isUpdating, updateServiceMutate }
}
