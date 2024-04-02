import { updateMandatory } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateMandatory = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updateMandatoryMutate } = useMutation({
    mutationFn: (form: any) => updateMandatory(+id, form),
    mutationKey: ['update-mandatory'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['mandatory'] })
      client.invalidateQueries({ queryKey: ['mandatories'] })
    },
  })

  return { isUpdating, updateMandatoryMutate }
}
